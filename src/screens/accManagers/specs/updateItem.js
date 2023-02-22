import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { toastOptions } from '../../../helper/toast'

export const updateItem = async (values, endpoint, id) => {
	await baseAPI.patch(`v1/${endpoint}/${id}`, values)
	const message = `${endpoint.replace(/([a-z])([A-Z])/g, '$1 $2')} Updated`
	toast.success(message, toastOptions)
}
