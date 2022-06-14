import axios from "axios";

const baseAPI = axios.create({
  baseURL: `${
    import.meta.env.VITE_BACKEND_URL
  }` /*  "https://cuttevents.herokuapp.com" */,
  /* headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
  }, */
});

export default baseAPI;
