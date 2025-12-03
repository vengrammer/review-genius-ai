
import TextArea from "../textArea";
import axios from "axios";

function Home() {

  const server_url = import.meta.env.VITE_BACKEND_URL;
  const text = "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It involves the green pigment chlorophyll and generates oxygen as a byproduct. The process occurs mainly in the chloroplasts of plant cells. Photosynthesis can be divided into two main stages: the light-dependent reactions, which capture energy from sunlight, and the Calvin cycle, which uses that energy to produce glucose. Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature."
  async function generateQuiz(reviewerText){
    try{
      const response = await axios.post(`${server_url}/api/ai/generatequiz`,{
        reviewer_text: reviewerText,
        
      })
      const data = response.data.questions
      console.log("Generated quiz:",data);
    }catch(error){
      console.log("error in fetching ai", error);
    }
  }
  generateQuiz(text);

  return (
    <div className="w-full md:p-20 p-5">
      <TextArea  />
    </div>
  );
}

export default Home;
