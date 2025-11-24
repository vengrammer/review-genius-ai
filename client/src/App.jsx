import HomePage from "@/routers/HomePage"
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
