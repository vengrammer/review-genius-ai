import QuizLayout from "@/layout/QuizLayout";
import QuiztionAndAnswer from "@/components/examineePage/QuestionAndAnswer";
import { Routes, Route, Navigate } from "react-router-dom";
function Quiz() {
  return (
    <Routes>
      <Route element={<QuizLayout />}>
        <Route path="questions" element={<QuiztionAndAnswer />} />
         <Route
            path="*"
            element={<Navigate to="/quiz/questions" replace />}
          />
      </Route>
    </Routes>
  );
}
export default Quiz;
