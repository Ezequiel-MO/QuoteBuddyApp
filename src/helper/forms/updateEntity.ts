import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { logger } from 'src/helper/debugging/logger'

export const updateEntity = async (
	entityType: string,
	entityData: any,
	entities: any[],
	dispatch: React.Dispatch<any>,
	endpoint: string | undefined = undefined
) => {
	try {
		const endpointUrl = endpoint ? endpoint : entityType
		const updateData = { ...entityData }
		delete updateData._id
		const response = await baseAPI.patch(
			`${endpointUrl}/${entityData._id}`,
			updateData
		)
		const updatedEntity = response.data.data.data

		let singularEntityType: string

		if (/ies$/i.test(entityType)) {
			singularEntityType = entityType.replace(/ies$/i, 'Y').toUpperCase()
		} else {
			singularEntityType = entityType.slice(0, -1).toUpperCase()
		}

		dispatch({
			type: `SET_${singularEntityType}`,
			payload: updatedEntity
		})

		const updatedEntities = entities?.map((entity) =>
			entity._id === updatedEntity._id ? updatedEntity : entity
		)
		dispatch({
			type: `SET_${entityType.toUpperCase()}`,
			payload: updatedEntities
		})

		toast.success(
			`${
				singularEntityType.charAt(0) + singularEntityType.slice(1).toLowerCase()
			} updated successfully`,
			toastOptions
		)
	} catch (error: any) {
		toast.error(
			`Failed to update ${entityType.slice(0, -1)}, ${
				error.response.data.message || ''
			}`,
			errorToastOptions
		)
		logger.logErrorToDatabase(
			error.response.data.message,
			`validation of the ${entityType} Update , its id is entityData._id. In updateEntity.ts`,
			'info'
		)
		throw error
	}
}
