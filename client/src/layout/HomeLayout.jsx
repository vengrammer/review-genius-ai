import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
function HomeLayout() {
    return (
        <div className="max-h-full ">
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}

export default HomeLayout;