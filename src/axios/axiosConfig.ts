import axios, { AxiosInstance } from 'axios'

const baseAPI: AxiosInstance = axios.create({
	baseURL:
		'http://localhost:3000/v2' /* `${import.meta.env.VITE_BACKEND_URL}` */,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
})

export default baseAPI
