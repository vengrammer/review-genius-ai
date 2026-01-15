import axios from "axios";

const userAxiosClient = axios.create({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

userAxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

userAxiosClient.interceptors.response.use((response) => {
    return response
    }, (error) => {
        try{
            const {response} = error;
            if(response.status === 401){
                localStorage.removeItem('admin_token')
                console.log('dito naman pag d auth')
            }
        }catch(e){
            console.log(e)
        }
        throw error;
    })

export default userAxiosClient;