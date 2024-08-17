import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

interface IProps {
    Component: React.ComponentType;
    protectedRoutes: boolean;
}


export default function ProtectedRoute({ Component, protectedRoutes }: IProps) {
    const navigate = useNavigate();
    const cookie = Cookies.get('bharani');
    let UserData: IcookieData | null = null;

    if (cookie) {
        UserData = JSON.parse(cookie);
    }

    const roleInfoCookie = Cookies.get('JobRole');
    const roleInfo: IRoleInfoData | null = roleInfoCookie ? JSON.parse(roleInfoCookie) : null;

    useEffect(() => {
        if (!protectedRoutes && UserData && roleInfo) {
            navigate('/home');
        } else if (protectedRoutes) {
            if (!UserData && !roleInfo) {
                navigate('/sign-in');
            } else if (!roleInfoCookie && UserData) {
                navigate('/onboard');
            }
        }
    }, [navigate, UserData, roleInfo, roleInfoCookie, protectedRoutes]);

    // If navigating, don't render the component
    return <Component />;
}
