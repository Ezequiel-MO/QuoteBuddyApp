import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions , errorToastOptions } from 'src/helper/toast'
import { uploadImages } from '@components/molecules/images/uploadImages'

export const createEntity = async (
	entityType: string,
	entityData: any,
	imageContentUrl: string[],
	dispatch: React.Dispatch<any>,
	endpoint: string | undefined = undefined
) => {
	try {
		const { imageContentUrl: _, ...data } = entityData
		const endpointUrl = endpoint ? endpoint : entityType
		const response = await baseAPI.post(`${endpointUrl}`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const newEntity = response.data.data.data
		await uploadImages(`${endpointUrl}`, newEntity._id, imageContentUrl || [])

		let singularEntityType: string

		if (/ies$/i.test(entityType)) {
			singularEntityType = entityType.replace(/ies$/i, 'Y').toUpperCase()
		} else {
			singularEntityType = entityType.slice(0, -1).toUpperCase()
		}

		dispatch({
			type: `SET_${entityType.toUpperCase()}`,
			payload: newEntity
		})
		dispatch({
			type: `ADD_${singularEntityType}`,
			payload: newEntity
		})

		toast.success(
			`${singularEntityType.charAt(0) + singularEntityType.slice(1).toLowerCase()
			} created successfully`,
			toastOptions
		)

		return newEntity
	} catch (error: any) {
		console.log(error)
		toast.error(
			`Failed to create ${entityType.slice(0, -1)} , ${error.response.data.message || ""}`,
			errorToastOptions,
		)
		throw error
	}
}
