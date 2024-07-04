// createEntity.ts
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions } from 'src/helper/toast'
import { uploadImages } from '@components/molecules/images/uploadImages'

export const createEntity = async (
	entityType: string,
	entityData: any,
	imageContentUrl: string[],
	dispatch: React.Dispatch<any>
) => {
	try {
		const { imageContentUrl: _, ...data } = entityData
		const response = await baseAPI.post(`${entityType}`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const newEntity = response.data.data.data
		await uploadImages(`${entityType}`, newEntity._id, imageContentUrl || [])
		dispatch({
			type: `SET_${entityType.toUpperCase()}`,
			payload: newEntity
		})
		dispatch({
			type: `ADD_${entityType.toUpperCase().slice(0, -1)}`,
			payload: newEntity
		})
		toast.success(
			`${
				entityType.charAt(0).toUpperCase() + entityType.slice(1, -1)
			} created successfully`,
			toastOptions
		)
		return newEntity
	} catch (error: any) {
		toast.error(
			`Failed to create ${entityType.slice(0, -1)}, ${error.message}`,
			toastOptions
		)
		throw error
	}
}
