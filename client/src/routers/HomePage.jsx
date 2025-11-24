import { Routes, Route } from "react-router-dom";
import Home from "@/components/home/Home";
import HomeLayout from "@/layout/HomeLayout";
import History from "@/components/home/History";
function Sample() {
  return (
    <Routes>
      <Route element={<HomeLayout/>}>
        <Route index element={<Home />} />
        <Route path="/history" element={<History/>}/>
      </Route>
    </Routes>
  );
}
export default Sample;
