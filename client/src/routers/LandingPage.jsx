import { Routes, Route } from "react-router-dom";
import LandingPage from "@/components/landing/LandingPage";
import Login from "@/components/landing/Login";

function LandingPageRoute() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default LandingPageRoute;
