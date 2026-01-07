import Examinee from "@/routers/Examinee"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./components/examineePage/NotFound";
import Quiz from "@/routers/Quiz";
import LandingPageRoute from "./routers/LandingPageRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LandingPageRoute/> } />
        <Route path="quiz/*" element={<Quiz/>} />
        <Route path="examinee/*" element={<Examinee/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
