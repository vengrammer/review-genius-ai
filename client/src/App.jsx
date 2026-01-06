import Examinee from "@/routers/Examinee"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./components/examineePage/NotFound";
import Quiz from "@/routers/Quiz";
import QuiztionAndAnswer from "@/components/examineePage/QuestionAndAnswer";
import LandingPageRoute from "./routers/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="landingpage/*" element={<LandingPageRoute/> } />
        <Route path="quiz/*" element={<Quiz/>} />
        <Route path="examinee/*" element={<Examinee/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
