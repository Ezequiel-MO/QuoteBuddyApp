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
		// Authorization: `Bearer ${localStorage.getItem('token')}`
	}
})

//se  agrega un interceptor para incluir el token en cada solicitud
baseAPI.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default baseAPI
