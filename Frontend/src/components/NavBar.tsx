import { NavLink, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Cookies from "js-cookie";

export default function NavBar() {
    const location = useLocation();
    const isPublicPage = location.pathname === '/sign-up' || location.pathname === '/sign-in';

    const role = JSON.parse(Cookies.get('bharani') || '')
    const isCandidate = role === 'candidate' ? true : false    

    return (
        <div className="w-full h-[75px] flex justify-around pr-[35px]">
            <div className="w-[20%] h-full flex justify-center items-center text-primary">
                <p className="text-2xl font-bold">HireQuest</p>
            </div>

            <div className="w-[55%] h-full">
                <ul className="flex items-center w-[90%] font-medium text-md text-neutral-500 h-full pl-24">
                    {
                        isPublicPage ? (
                            <div className="flex w-[70%] justify-around">
                                <NavLink to={'/home'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                                <NavLink to={'/sign-in'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Login</li></NavLink>
                                <NavLink to={'/sign-up'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Register</li></NavLink>
                            </div>
                        ) : isCandidate ? (
                            <div className="w-full flex justify-between">
                                <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                                <NavLink to={'/jobs'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                                <NavLink to={'/companies'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Companies</li></NavLink>
                                <NavLink to={'/feed'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                                <NavLink to={'/activity'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Activity</li></NavLink>
                                <NavLink to={'/account'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                            </div>
                        ) : (
                            <div className="w-full flex justify-between">
                                <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Home</li></NavLink>
                                <NavLink to={'/jobs'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Jobs</li></NavLink>
                                <NavLink to={'/feed'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer">Feed</li></NavLink>
                                <NavLink to={'/account'} className={({ isActive }) => isActive ? "text-foreground font-bold" : ""}><li className="cursor-pointer ">Account</li></NavLink>
                            </div>
                        )
                    }
                </ul>
            </div>
            <div className="w-[15%] h-full flex justify-center items-center">
                <ModeToggle />
                {
                    isCandidate ? (
                        <div className="w-10 h-10 bg-foreground ml-5 rounded-full">

                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    );
}
