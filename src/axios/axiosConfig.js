import axios from "axios";

const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  /* headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  }, */
});

export default baseAPI;
