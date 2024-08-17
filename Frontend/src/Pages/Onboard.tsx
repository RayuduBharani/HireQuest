import CandidateForm from "@/components/CandidateForm"
import RecruiterForm from "@/components/RecruiterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Onboard() {
    const navigate = useNavigate();

    const cookie = Cookies.get('bharani') || null;

    const userData: IcookieData | null = cookie ? JSON.parse(cookie) : null;

    if (userData?.role) {
        toast({title : 'You are already Onboarded.'})
        navigate('/home')
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[60%] h-[90%] p-5">
                <Tabs defaultValue="candidate">
                    <div className="w-full h-fit flex justify-between">
                        <p className="text-xl font-bold mt-1">Welcome To Onboarding</p>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recuiter</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="w-full h-[540px] mt-3 overflow-y-scroll hide-scrollbar">
                        <TabsContent value="candidate"><CandidateForm /></TabsContent>
                        <TabsContent value="recruiter"><RecruiterForm /></TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
