import Examinee from "@/routers/Examinee";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./components/examineePage/NotFound";
import Quiz from "@/routers/Quiz";
import LandingPageRoute from "./routers/LandingPageRoute";
import {AuthProvider} from "./hooks/AuthProvider";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<LandingPageRoute />} />
          <Route path="quiz/*" element={<Quiz />} />
          <Route path="examinee/*" element={<Examinee />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
