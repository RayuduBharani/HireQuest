import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/RoleBasedPages/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./Pages/PrivateComponent";
import JobPage from "./Pages/RoleBasedPages/JobPage";
import Companies from "./Pages/Companies";
import Activity from "./Pages/Activity";
import FeedPage from "./Pages/RoleBasedPages/FeedPage";
import AccountPage from "./Pages/RoleBasedPages/AccountPage";
import Onboard from "./Pages/Onboard";

export default function App() {
  const location = useLocation();
  const showNavBar = location.pathname === '/onboard';

  return (
    <div>
      {showNavBar ? null : <NavBar />}
        <Routes>
          <Route path="/sign-in" element={<ProtectedRoute Component={SignInPage} protectedRoutes={false} />} />
          <Route path="/sign-up" element={<ProtectedRoute Component={SignUpPage} protectedRoutes={false} />} />
          <Route path="/home" element={<ProtectedRoute Component={HomePage} protectedRoutes={true} />} />
          <Route path="/jobs" element={<ProtectedRoute Component={JobPage} protectedRoutes={true} />} />
          <Route path="/companies" element={<ProtectedRoute Component={Companies} protectedRoutes={true} />} />
          <Route path="/activity" element={<ProtectedRoute Component={Activity} protectedRoutes={true} />} />
          <Route path="/feed" element={<ProtectedRoute Component={FeedPage} protectedRoutes={true} />} />
          <Route path="/account" element={<ProtectedRoute Component={AccountPage} protectedRoutes={true} />} />
          <Route path="/onboard" element={<ProtectedRoute Component={Onboard} protectedRoutes={true} />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
    </div>
  );
}
