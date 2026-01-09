import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/components/landing/LandingPage";
import LoginSignup from "@/components/landing/LoginSignup";
import Feature from "@/components/landing/Feature";

function LandingPageRoute() {
  return (
    <Routes>
      <Route element={<LandingPage />}>
        <Route index element={<Navigate to="feature" replace />} />
        <Route path="home" element={<Feature />} />
        <Route path="login" element={<LoginSignup />} />
        <Route path="signup" element={<LoginSignup />} />
        <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
      </Route>
    </Routes>
  );
}

export default LandingPageRoute;
