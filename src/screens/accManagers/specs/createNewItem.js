import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { toastOptions } from '../../../helper/toast'

export const createNewItem = async (values, files, endpoint) => {
	let dataToPost = new FormData()
	for (let key in values) {
		dataToPost.append(key, values[key])
	}
	if (files.length > 0) {
		for (let i = 0; i < files.length; i++) {
			dataToPost.append('imageContentUrl', files[i])
		}
	}
	await baseAPI.post(`v1/${endpoint}`, dataToPost)
	const message = `${endpoint.replace(/([a-z])([A-Z])/g, '$1 $2')} Created`
	toast.success(message, toastOptions)
}
