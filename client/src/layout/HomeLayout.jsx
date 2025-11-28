import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import background from "@/assets/background.jpg"
function HomeLayout() {
    return (
        <div className="max-h-full" >
            <Navbar/>
            <div className="w-full bg-cover bg-center min-h-screen" style={{backgroundImage:   `url(${background})`}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default HomeLayout;