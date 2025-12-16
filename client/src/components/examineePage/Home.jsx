import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

function Home() {
  const server_url = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [reviewerText, setReviewerText] = useState("");

  async function createQuiz(e) {
    e.preventDefault();

    try {
      const response = await axios.post(`${server_url}/api/ai/generatequiz`, {
        title: title,
        reviewer_text: reviewerText
      });
      console.log('AI response:', response.data);
    } catch (error) {
      console.log("Error fetching AI:", error);
    }
  }

  return (
    <div className="*:not-first:mt-2 lg:p-10 min-h-screen p-3">
      <form onSubmit={createQuiz}>
        <div className="mt-4 ml-10 mb-6">
          <Label htmlFor="title" className="text-[#66ff00] text-2xl italic">
            Enter Your Learning Material
          </Label>
        </div>
        <div className="lg:m-10">
          <Textarea
            id="title"
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="min-h-3 text-[#fed330] lg:text-[1.5rem] border-[#fed330] border-2 rounded-2xl placeholder:text-[#fed330] italic"
            placeholder="Title of Learning Topic"
          />
        </div>
        <div className="lg:m-10">
          <Textarea
            id="reviewer_text"
            name="reviewer_text"
            value={reviewerText}
            onChange={e => setReviewerText(e.target.value)}
            className="min-h-120 text-[#fed330] rounded-lg lg:text-[1.2rem] border-[#fed330] border-2 placeholder:text-[#fed330] italic"
            placeholder="Paste Your Learning Material"
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-[#0015fe] hover:bg-[#226efc] lg:mr-10 cursor-pointer border-none"
            variant="outline"
            type='submit'
          >
            <span className="text-[#40ff06]">GENERATE QUIZ</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Home;
