import React from "react";
import blackboard from "@/assets/blackboard.jpg";
import { Outlet } from "react-router-dom";

function QuizLayout() {
  return (
    <div className="max-h-full">
      <div
        className="w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${blackboard})` }}
      >
       
        <Outlet/>
      </div>
    </div>
  );
}

export default QuizLayout;
