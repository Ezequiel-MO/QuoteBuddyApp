import axios, { AxiosInstance } from 'axios'

// INTERFACE GLOBAL PARA "env"
declare global {
	interface ImportMeta {
		env: {
			[x: string]: string
			VITE_BACKEND_URL: string
		}
	}
}

const baseAPI: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
		'X-Company-Identifier': 'CUTT_DB_PROD'
	}
})

export default baseAPI
