import { useState } from "react";
import { Button } from "../ui/button";
import { MessageCircleQuestionMark } from "lucide-react";

function QuiztionAndAnswer() {
  const data = {
    1: {
      question: "What is the largest planet in our solar system?",
      choices: [
        ["A. Jupiter", true],
        ["B. Earth", false],
        ["C. Mars", false],
        ["D. Venus", false],
      ],
    },
    2: {
      question: "What do plants primarily use for photosynthesis?",
      choices: [
        ["A. Oxygen", false],
        ["B. Carbon dioxide", true],
        ["C. Nitrogen", false],
        ["D. Hydrogen", false],
      ],
    },
    3: {
      question: "Which part of the computer is considered the brain?",
      choices: [
        ["A. Hard Drive", false],
        ["B. RAM", false],
        ["C. CPU", true],
        ["D. GPU", false],
      ],
    },
    4: {
      question: "Which gas do humans need to breathe in to survive?",
      choices: [
        ["A. Carbon monoxide", false],
        ["B. Oxygen", true],
        ["C. Helium", false],
        ["D. Nitrogen", false],
      ],
    },
    5: {
      question: "Which ocean is the largest on Earth?",
      choices: [
        ["A. Atlantic Ocean", false],
        ["B. Indian Ocean", false],
        ["C. Pacific Ocean", true],
        ["D. Arctic Ocean", false],
      ],
    },
    6: {
      question: "Which ocean is the largest on Earth?",
      choices: [
        ["A. Atlantic Ocean", false],
        ["B. Indian Ocean", false],
        ["C. Pacific Ocean", true],
        ["D. Arctic Ocean", false],
      ],
    },
  };

  const questionKeys = Object.keys(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const currentQuestion = data[questionKeys[currentIndex]];

  const handleNext = () => {
    if (currentIndex < questionKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const checkCorrectAnswer = (isCorrect, index) => {
    setSelectedIndex(index);
    if (isCorrect) {
      setTotalScore(totalScore + 1);
    } 
    setShowCorrectAnswer(true);
  };

  console.log(totalScore);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-3xl bg-[#3498db] border border-[#1e90ff] rounded-2xl shadow-xl p-6 sm:p-8">
        {/*question*/}
        <div className="border bg-white border-[#f1c40f] w-full p-5 rounded-xl text-center shadow-sm">
          <MessageCircleQuestionMark size={50} className="m-auto" />
          <span className="text-lg font-medium text-gray-800">
            <span>{currentIndex + 1}. </span>
            {currentQuestion.question}
          </span>
        </div>

        {/* Choices */}
        <div className="mt-6 sm:mt-10 flex flex-col gap-4">
          {currentQuestion.choices.map(([text, isCorrect], index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => checkCorrectAnswer(isCorrect, index)}
              className={`${
                selectedIndex === index && !isCorrect && showCorrectAnswer
                  ? `bg-red-600`
                  : ``
              } ${
                isCorrect && showCorrectAnswer && `bg-green-300`
              } w-full h-20 border border-[#f1c40f] rounded-xl shadow-sm hover:bg-[#f9a640] text-left px-4 cursor-pointer`}
            >
              <span>{text}</span>
            </Button>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 flex justify-center">
          <Button
            onClick={handleNext}
            className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-base sm:text-lg shadow-md"
          >
            <span>
              {currentIndex + 1} / {questionKeys.length}{" "}
            </span>
            {currentIndex < questionKeys.length - 1
              ? "Next Question →"
              : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuiztionAndAnswer;
