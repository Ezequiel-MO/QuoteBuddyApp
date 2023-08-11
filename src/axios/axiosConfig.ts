import axios, { AxiosInstance } from 'axios'

// INTERFACE GLOBAL PARA "env" 
declare global {
	interface ImportMeta {
	  env: {
		VITE_BACKEND_URL: string;
	  };
	}
  }

const baseAPI: AxiosInstance = axios.create({
	// baseURL: 'http://localhost:3000/v2',
	baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
})

export default baseAPI
