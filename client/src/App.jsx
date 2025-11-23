import HomeLayout from "./layout/homeLayout";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeLayout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
