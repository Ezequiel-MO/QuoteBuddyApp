// updateEntity.ts
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions } from 'src/helper/toast'

export const updateEntity = async (
	entityType: string,
	entityData: any,
	entities: any[],
	dispatch: React.Dispatch<any>
) => {
	try {
		const response = await baseAPI.patch(
			`${entityType}/${entityData._id}`,
			entityData
		)
		const updatedEntity = response.data.data.data

		// Ensure the dispatch type is in singular form
		const singularEntityType = entityType.slice(0, -1).toUpperCase() // remove the plural 's' and convert to upper case

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
			`Failed to update ${entityType.slice(0, -1)}, ${error.message}`,
			toastOptions
		)
		throw error
	}
}
