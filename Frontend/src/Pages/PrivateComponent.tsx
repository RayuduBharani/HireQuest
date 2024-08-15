import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ Component, protectedRoutes }: IProps) {
    // Retrieve and parse cookie data
    const cookie = Cookies.get('bharani');
    let UserData: IcookieData | null = null;

    if (cookie) {
        UserData = JSON.parse(cookie);
    }


    const roleInfoCookie = Cookies.get('JobRole');
    const roleInfo: IRoleInfoData | null = roleInfoCookie ? JSON.parse(roleInfoCookie) : null;
    console.log(roleInfo);
    console.log(cookie)
    
    if (!protectedRoutes && UserData && roleInfo) {
        return <Navigate to="/home" />;
    }

    if(protectedRoutes){
        if (!UserData && !roleInfo) {
            return <Navigate to="/sign-in" />;
        }
    }

    if (!roleInfoCookie && UserData && protectedRoutes) {
        return <Navigate to="/onboard" />;
    }

    

    return <Component />;
}

