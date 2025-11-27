import Examinee from "@/routers/Examinee"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NotFound from "./components/examineePage/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="examinee/*" element={<Examinee/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
