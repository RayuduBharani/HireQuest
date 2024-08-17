import OAuth from "@/components/OAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

export default function SignUpPage() {

  const navigate : NavigateFunction = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  
  const [signUpData, setSignUpData] = useState<IsignUpData>({
    username: '',
    useremail: '',
    userpassword: ''
  })
  function handleEvent(event: ChangeEvent<HTMLInputElement>) {
    setSignUpData((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      });
      const data = await response.json();
      if(data.success == true){      
        toast({
          title : 'Registration success'
        })
        setLoading(false)
        navigate('/sign-in')
      }
      else{
        setLoading(false)
        toast({
          title : 'User Already Exists'
        })
      }
    }
    catch (err) {
      setLoading(false)
      toast({
        title : 'Some err happend ! Try Again '
      })
      setSignUpData({
        username: '',
        useremail: '',
        userpassword: ''
      })
    }
  }

  function isFormValid() {
    return signUpData.username !== '' && signUpData.useremail !== '' && signUpData.userpassword !== '' && signUpData.userpassword.length >= 8;
  }

  return (
    <div className="w-svw h-full flex">
      <form onSubmit={handleSubmit} className="w-[30%] h-[555px] mx-auto my-auto shadow-2xl border-2 border-neutral-300 rounded-lg mt-5 p-5 flex flex-col max-sm:w-[80%]">
        <p className="text-sm mt-2">Welcome !</p>
        <OAuth />
        <p className="text-center mt-5">or</p>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="name">Name</Label>
          <Input onChange={handleEvent} value={signUpData.username} id="name" type="text" name="username" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="email">Email</Label>
          <Input onChange={handleEvent} value={signUpData.useremail} id="email" type="email" name="useremail" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="Password">Password</Label>
          <Input onChange={handleEvent} minLength={8} value={signUpData.userpassword} id="Password" type="password" name="userpassword" />
        </div>

        <Button disabled={loading || !isFormValid()} className="mt-7">{loading ? "Loading ..." : "Register"}</Button>
        <p className="text-sm mt-5">Already have an Account ? <Link to={'/sign-in'} className="text-primary font-medium">SignIn</Link></p>
      </form>
    </div>
  )
}
