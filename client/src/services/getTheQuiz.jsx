import axios from "axios";

async function getTheQuiz(text) {
  const server_url = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios.post(`${server_url}/api/ai/generatequiz`, {
      reviewer_text: text,
    });

    return response.data.questions;
  } catch (error) {
    const serverInfo = error?.response?.data ?? error.message;
    throw new Error(
      `There was an error generating the reviewer quiz: ${JSON.stringify(
        serverInfo
      )}`
    );
  }
}

export default getTheQuiz;