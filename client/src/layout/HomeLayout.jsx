import Navbar from "../components/navbar";
import { Button } from "@/components/ui/button";
import ComfirmationModal from "@/components/confirmationModal";
function HomeLayout() {
    return (
        <div>
            <Navbar/>
            <ComfirmationModal buttonName="hey girl"/>
        </div>
    );
}

export default HomeLayout;