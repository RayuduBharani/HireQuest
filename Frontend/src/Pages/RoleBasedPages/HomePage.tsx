import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate()
    const cookie = Cookies.get('bharani') || ''
    const handleLogout = () => {
        if (cookie) {
            Cookies.remove('bharani')
            navigate('/sign-in')
        }
    }


    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
