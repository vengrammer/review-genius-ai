import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/components/examineePage/Home";
import HomeLayout from "@/layout/HomeLayout";
import History from "@/components/examineePage/History";
import About from "@/components/examineePage/About";
import Help from "@/components/examineePage/Help";
import { useAuth } from "@/hooks/AuthProvider";

function Examinee() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
         <Route
            path="*"
            element={<Navigate to="/examinee/home" replace />}
          />
      </Route>
    </Routes>
  );
}
export default Examinee;
