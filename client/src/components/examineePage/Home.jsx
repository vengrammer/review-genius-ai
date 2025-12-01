import TextArea from "../textArea";
import { useEffect } from "react";
import axios from "axios";
function Home() {
  const api = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend API URL:", api);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${api}/hey`);
        console.log(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [api]);

  return (
    <div className="w-full md:p-20 p-5">
      <TextArea />
    </div>
  );
}

export default Home;
