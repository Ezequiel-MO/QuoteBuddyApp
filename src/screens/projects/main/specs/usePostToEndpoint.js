import { computeTotalDays } from '../../../../helper/helperFunctions'
import {
	employeeExistsInCompany,
	handleCreateProject,
	handlePdfUpdate,
	handleUpdateProject,
	transformData
} from './transformData'

import { useNavigate } from 'react-router-dom'

export const usePostToEndpoint = (project, onSuccess, onError) => {
	const navigate = useNavigate()

	const postToEndpoint = async (data, files, endPoint, update, open) => {
		const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
		data = await employeeExistsInCompany(data)
		let { transformedData, formData } = transformData({
			data,
			diffDays,
			files,
			open
		})

		try {
			if (update) {
				await handleUpdateProject(project, data, files, endPoint, onSuccess)
			} else {
				await handleCreateProject(
					transformedData,
					formData,
					endPoint,
					onSuccess
				)
			}
			if (endPoint === 'projects/image') {
				await handlePdfUpdate(project, data, files)
			}
			setTimeout(() => {
				navigate('/app')
			}, 1000)
		} catch (error) {
			console.log(error)
			onError(error.response.data.message)
		}
	}

	return postToEndpoint
}
