import React from "react";
import { Outlet } from "react-router-dom";
import Navbarlandingpage from "../navbarlandingpage";

function LandingPage() {
  return (
    <div>
      <Navbarlandingpage />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
