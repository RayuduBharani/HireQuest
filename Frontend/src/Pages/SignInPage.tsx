import OAuth from "@/components/OAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function SignInPage() {
  const navigate: NavigateFunction = useNavigate()

  const [signInData, setSignInData] = useState<IsignInData>({ useremail: '', userpassword: '' })
  const [Loading, setLoading] = useState<boolean>(false)

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setSignInData((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/sign-in', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signInData)
      })
      const data = await response.json()
      if (data.success) {
        Cookies.set("bharani", JSON.stringify(data))
        toast({
          title: 'Login success'
        })
        setLoading(false)
        navigate('/onboard')
        setSignInData({
          useremail: '',
          userpassword: ''
        })
      }
      else if (data.message == 'Incorrect Password') {
        toast({
          title: 'Incorrect Password'
        })
        setLoading(false)
        setSignInData({
          useremail: '',
          userpassword: ''
        })
      }
      else if (data.message == "user not found") {
        toast({
          title: "User not found"
        })
        setLoading(false)
        setSignInData({
          useremail: '',
          userpassword: ''
        })
      }
      else {
        setLoading(false)
        toast({
          title: 'Some err happened ! please try again'
        })
      }
    }
    catch (err) {
      setLoading(false)
      toast({
        title: 'Some err happened ! please try again'
      })
    }
  }

  function isFormValid() {
    return signInData.userpassword !== '' && signInData.useremail !== ''
  }

  return (
    <div className="w-svw h-full flex">
      <form onSubmit={handleSubmit} className="w-[30%] h-[500px] mx-auto my-auto shadow-2xl border-2 border-neutral-300 rounded-lg mt-6 p-5 flex flex-col max-lg:w-[40%] max-md:w-[60%] max-sm:w-[80%]">
        <p className="text-sm mt-4">Welcome !</p>
        <OAuth />
        <p className="text-center mt-5">or</p>
        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="name">Email</Label>
          <Input onChange={handleInput} value={signInData.useremail} id="name" type="email" name="useremail" />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Label htmlFor="Password">Password</Label>
          <Input onChange={handleInput} value={signInData.userpassword} id="Password" type="password" name="userpassword" />
        </div>

        <Button disabled={Loading || !isFormValid()} className="mt-7">{Loading ? 'Loading...' : 'Login'}</Button>
        <p className="text-sm mt-5">Dont have an accout ? <Link to={'/sign-up'} className="text-primary font-medium">SignUp</Link></p>
      </form>
    </div>

  )
}