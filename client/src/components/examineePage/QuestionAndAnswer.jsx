import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MessageCircleQuestionMark } from "lucide-react";
import getTheQuiz from "@/services/getTheQuiz";

function QueztionAndAnswer() {
  const text =
    "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It involves chlorophyll and generates oxygen as a byproduct. It occurs mainly in the chloroplasts. It has two stages: light-dependent reactions and the Calvin cycle.";

  const [quiz, setQuiz] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const questionKeys = Object.keys(quiz);

  // Fetch quiz on mount
  useEffect(() => {
    async function loadQuiz() {
      try {
        const questions = await getTheQuiz(text);
        setQuiz(questions);                      
        console.log("Quiz loaded:", questions);
      } catch (err) {
        console.error("There's an error:", err.message);
      }
    }

    loadQuiz();
  }, []);

  // If no questions yet → show loading
  if (questionKeys.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading quiz...
      </div>
    );
  }

  const currentQuestion = quiz[questionKeys[currentIndex]];

  const handleNext = () => {
    if (currentIndex < questionKeys.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowCorrectAnswer(false);
      setSelectedIndex(null);
    }
  };

  const checkCorrectAnswer = (isCorrect, index) => {
    setSelectedIndex(index);

    if (isCorrect) {
      setTotalScore((prev) => prev + 1);
    }

    setShowCorrectAnswer(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-3xl bg-[#3498db] border border-[#1e90ff] rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Question */}
        <div className="border bg-white border-[#f1c40f] w-full p-5 rounded-xl text-center shadow-sm">
          <MessageCircleQuestionMark size={50} className="m-auto" />
          <span className="text-lg font-medium text-gray-800">
            {currentIndex + 1}. {currentQuestion.question}
          </span>
        </div>

        {/* Choices */}
        <div className="mt-6 sm:mt-10 flex flex-col gap-4">
          {currentQuestion.choices.map(([text, isCorrect], index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                if (!showCorrectAnswer) checkCorrectAnswer(isCorrect, index);
              }}
              className={`
                ${
                  selectedIndex === index && !isCorrect && showCorrectAnswer
                    ? "bg-red-600 text-white"
                    : ""
                }
                ${
                  isCorrect && showCorrectAnswer
                    ? "bg-green-500 text-white"
                    : ""
                }
                w-full h-20 border border-[#f1c40f] rounded-xl shadow-sm
                hover:bg-[#f9a640]
                text-left px-4 cursor-pointer
              `}
            >
              {text}
            </Button>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-6 sm:mt-10 flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!showCorrectAnswer}
            className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-base sm:text-lg shadow-md"
          >
            {currentIndex + 1} / {questionKeys.length}
            {currentIndex < questionKeys.length - 1 ? "  → Next" : "  Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QueztionAndAnswer;