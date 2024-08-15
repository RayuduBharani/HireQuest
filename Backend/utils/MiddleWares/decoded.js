const jwt = require('jsonwebtoken');

function VerifyToken(req, res, next) {
    if (req.headers.authorization != undefined) {
        const token = req.headers.authorization.split(" ")[1]
        if (token != undefined) {
            jwt.verify(token, 'JOBPORTEL', function (err, decoded) {
                if(!err){
                    next();
                }
                else{
                    res.send({ message: "Wrong Token" })
                }
            })
        }
        else {
            res.send({ message: "Wrong Token" })
        }
    }
    else{
        res.send({ message: "Send a token" })
    }
}

module.exports = VerifyToken