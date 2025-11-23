import Test from "../Test";
import { Routes, Route } from "react-router-dom";
function Sample() {
  return (
    <Routes>
      <Route path="/testing" element={<Test/>} />
    </Routes>
  );
}
export default Sample;