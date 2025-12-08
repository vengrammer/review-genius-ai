import { Textarea } from "@/components/ui/textarea";
//import axios from "axios";
import { Button } from "../ui/button";
import { useId } from "react";
import { Label } from "../ui/label";

function Home() {
  const id = useId();
  /*const server_url = import.meta.env.VITE_BACKEND_URL;
  const text =
    "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It involves the green pigment chlorophyll and generates oxygen as a byproduct. The process occurs mainly in the chloroplasts of plant cells. Photosynthesis can be divided into two main stages: the light-dependent reactions, which capture energy from sunlight, and the Calvin cycle, which uses that energy to produce glucose. Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature.";
  async function generateQuiz(reviewerText) {
    try {
      const response = await axios.post(`${server_url}/api/ai/generatequiz`, {
        reviewer_text: reviewerText,
      });
      const data = response.data.questions;
      console.log("Generated quiz:", data);
    } catch (error) {
      console.log("error in fetching ai", error);
    }
  }
  //generateQuiz(text);
*/
  return (
    <div className="*:not-first:mt-2 p-10 min-h-screen">
      <div className="mt-4 ml-10 mb-6">
        <Label htmlFor={id} className="text-[#66ff00] text-2xl italic"  >
          Enter Your Learning Material{" "}
        </Label>
      </div>
      <div className="m-10">
        <Textarea
          className="min-h-3 text-[#fed330] md:text-[1.5rem] border-[#fed330] border-2 rounded-2xl placeholder:text-[#fed330] italic"
          placeholder="Title of Learning Material"
        />
      </div>
      <div className="m-10">
        <Textarea
        className="min-h-129 text-[#fed330] rounded-lg md:text-[1.2rem] border-[#fed330] border-2 placeholder:text-[#fed330] italic"
          placeholder="Paste Your Learning Material"
        />
      </div>

      <div className="flex justify-end">
        <Button
          className="text-[#fed330] bg-[#0652DD] hover:bg-[#226efc] cursor-pointer border-none"
          variant="outline"
        >
          GENERATE QUIZZ
        </Button>
      </div>
    </div>
  );
}

export default Home;
