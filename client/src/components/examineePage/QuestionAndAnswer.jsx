import { Button } from "../ui/button";
import { MessageCircleQuestionMark } from "lucide-react";

function QuiztionAndAnswer() {
  const question =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod fugiat quos modi, tempore iste illo explicabo dicta officiis quasi esse iure veniam vel illum corporis velit error placeat.";

  const answers = [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ];

  const data = [
    {
      question: "1. What is the capital city of France?",
      answers: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    },
    {
      question: "2. Which planet is known as the Red Planet?",
      answers: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
    },
    {
      question: "3. What gas do plants absorb from the atmosphere?",
      answers: ["A. Oxygen", "B. Nitrogen", "C. Carbon Dioxide", "D. Hydrogen"],
    },
    {
      question: "4. What is the largest ocean on Earth?",
      answers: [
        "A. Atlantic Ocean",
        "B. Pacific Ocean",
        "C. Indian Ocean",
        "D. Arctic Ocean",
      ],
    },
    {
      question: "5. Who wrote the play 'Romeo and Juliet'?",
      answers: [
        "A. Charles Dickens",
        "B. William Shakespeare",
        "C. Mark Twain",
        "D. Jane Austen",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-3xl bg-[#3498db] border border-[#1e90ff] rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Question */}
        <div className="border bg-white border-[#f1c40f] w-full sm:p-5  rounded-xl text-center shadow-sm">
          <span>
            <MessageCircleQuestionMark size={50} className="m-auto " />
          </span>
          <span className="text-lg font-medium text-gray-800">{question}</span>
        </div>

        {/* Answers: 2 per row on desktop, 1 per row on mobile */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-col gap-4">
          {[0, 2].map((startIndex) => (
            <div key={startIndex} className="flex flex-col sm:flex-row gap-4">
              {answers.slice(startIndex, startIndex + 2).map((text, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex-1 h-20 border border-[#f1c40f] rounded-xl shadow-sm hover:bg-[#f9a640] text-left px-4 cursor-pointer"
                >
                  {text}
                </Button>
              ))}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-6 sm:mt-10 flex justify-center">
          
          <Button className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-base sm:text-lg shadow-md">
            <span>1/5</span><span>Next Question →</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuiztionAndAnswer;
