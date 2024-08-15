import { FormEvent,useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Cookies from "js-cookie";
import { toast } from "./ui/use-toast";
export default function RecruiterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const cookie = Cookies.get('bharani') || null;

  const userData: IcookieData | null = cookie ? JSON.parse(cookie) : null;


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const recruiterName = formData.get('name')?.toString() || "";
    const companyName = formData.get('companyName')?.toString() || "";
    const companyRole = formData.get('companyRole')?.toString() || "";

    if (!userData) {
      toast({ title: "User data is missing." });
      setLoading(false);
      return;
    }

    const RecruiterFormData = {
      userId: userData.userId,
      email: userData.useremail,
      userType: "recruiter",
      role: {
        recruiterInfo: {
          name: recruiterName,
          companyName: companyName,
          companyRole: companyRole
        }
      }
    };

    try {
      const response = await fetch('http://localhost:8000/onboard', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userData.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(RecruiterFormData)
      });
      const data: IOnboardResponse = await response.json();
      toast({ title: data.message });
    } catch (error) {
      console.error("Error onboarding recruiter:", error);
      toast({ title: "Error onboarding recruiter." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-t-2 pt-4 border-primary p-1">
      <div>
        <Label htmlFor="name" className="ml-1">Your Name</Label>
        <Input id="name" name="name" />
      </div>

      <div>
        <Label htmlFor="companyName" className="ml-1">Current Company</Label>
        <Input id="companyName" name="companyName" />
      </div>

      <div>
        <Label htmlFor="companyRole" className="ml-1">Current Role</Label>
        <Input id="companyRole" name="companyRole" />
      </div>

      <Button disabled={loading} type="submit">{loading ? "Loading..." : "Onboard as a Recruiter"}</Button>
    </form>
  );
}