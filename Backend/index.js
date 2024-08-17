const express = require("express");
const cors = require("cors");
const connectDatabase = require("./utils/DB");
const User = require("./utils/Schema/userSchema");
const Recruiter = require("./utils/Schema/recruiterSchema");
const Candidate = require("./utils/Schema/candidateSchema");
const Job = require("./utils/Schema/jobSchema");
const VerifyToken = require("./utils/MiddleWares/decoded");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  

const app = express();
app.use(cors());
app.use(express.json());

// register

app.post("/sign-up", async (req, res) => {
  connectDatabase();
  try {
    const existedUser = await User.findOne({ useremail: req.body.useremail });
    console.log(existedUser);

    if (existedUser) {
      return res.send({ success: false, message: "User Already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.userpassword, salt);

    const newUser = new User({
      username: req.body.username,
      useremail: req.body.useremail,
      userpassword: hash,
      userimage: req.body.userimage,
    });
    await newUser.save();
    res.send({ success: true, message: "Registration successful", newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        success: false,
        message: "Some error happened in the registration",
        err: err,
      });
  }
});

// login

app.post("/sign-in", async (req, res) => {
  connectDatabase();
  try {
    const loginData = await User.findOne({ useremail: req.body.useremail });

    if (loginData) {
      bcrypt.compare(
        req.body.userpassword,
        loginData.userpassword,
        function (err, result) {
          if (result == true) {
            jwt.sign(
              {
                userId: loginData._id,
                useremail: loginData.useremail,
                username: loginData.username,
                userimage: loginData.userimage,
                role : loginData.role,
              },
              "JOBPORTEL",
              { expiresIn: "168h" },
              function (err, token) {
                if (!err) {
                  jwt.verify(token, "JOBPORTEL", function (err, decoded) {
                    if (!err) {
                      res.send({
                        success: true,
                        token,
                        useremail: decoded.useremail,
                        userId: decoded.userId,
                        username: decoded.username,
                        userimage: decoded.userimage,
                        role : decoded.role,
                      });
                    }
                  });
                } else {
                  res.send({ success: false, message: "token not generated" });
                }
              }
            );
          } else {
            res.send({ success: false, message: "Incorrect Password" });
          }
        }
      );
    } else {
      res.send({ success: false, message: "user not found" });
    }
  } catch (err) {
    res.send({ success: false, message: "Some err happened in the login" });
  }
});

// google auth

app.post("/google", async (req, res) => {
  connectDatabase();
  try {
    const existingUser = await User.findOne({ useremail: req.body.useremail });
    console.log(existingUser);

    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          useremail: existingUser.useremail,
          username: existingUser.username,
          userimage: existingUser.userimage,
          role : existingUser.role,
        },
        "JOBPORTEL",
        { expiresIn: "168h" }
      );
      const decoded = jwt.verify(token, "JOBPORTEL");
      res.send({
        success: true,
        token: token,
        userId: decoded.id,
        useremail: decoded.useremail,
        username: decoded.username,
        userimage: decoded.userimage,
        role : decoded.role,
      });
    } else {
      const generatePass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPass = bcrypt.hashSync(generatePass, 10);

      const newUser = {
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: hashPass,
        userimage: req.body.userimage,
      };

      const createdUser = await User.create(newUser);
      const token = jwt.sign(
        {
          id: createdUser._id,
          useremail: createdUser.useremail,
          username: createdUser.username,
          userimage: createdUser.userimage,
        },
        "JOBPORTEL",
        { expiresIn: "1h" }
      );

      if (createdUser) {
        var decoded = jwt.verify(token, "JOBPORTEL");
        res.send({
          success: true,
          token: token,
          userId: decoded.id,
          useremail: decoded.useremail,
          username: decoded.username,
          userimage: decoded.userimage,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Internal Server Error", err: error });
  }
});

// onboard

app.post('/onboard-candidate', VerifyToken, async (req, res) => {
  connectDatabase()
  try {
    const newCandidate = new Candidate(req.body)
    const token = req.headers.authorization.split(' ')[1]
    const userData = jwt.decode(token)
    const user = await User.findById(userData.userId)
    if (!user.role) {
      const result = await User.findByIdAndUpdate(userData.userId, {
        $set: { role: "candidate" },
      });
      await newCandidate.save();
      result.role = 'candidate'
      res
        .status(201)
        .json({success: true, message: "You Are Onboared as a Candidate.",result});
    } else {
        res.status(200).json({success : false, message : "You Are Already Onboarded as a Candidate."})
    }
  } catch (err) {
    res.status(500).json({success : false, message : err.message})
  }
})

app.post("/onboard-recruiter", VerifyToken, async (req, res) => {
  connectDatabase();
  try {
    const newRecruiter = new Recruiter(req.body);
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.decode(token);
    const user = await User.findById(userData.userId);
    if (!user.role) {
      const result = await User.findByIdAndUpdate(userData.userId, {
        $set: { role: "recruiter" },
      });
      await newRecruiter.save();
      result.role = 'recruiter'
      res
        .status(201)
        .json({success: true, message: "You Are Onboared as a Recruiter.",result});
    } else {
        res.status(200).json({success : false, message : "You Are Already Onboarded as a Recruiter."})
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
