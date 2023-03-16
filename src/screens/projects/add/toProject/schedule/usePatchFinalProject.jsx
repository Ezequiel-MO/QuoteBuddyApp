import { useCallback } from 'react'
import baseAPI from '../../../../../axios/axiosConfig'

export const usePatchProject = (onSuccess, onError) => {
	const patchProject = useCallback(
		async (projectId, data) => {
			try {
				await baseAPI.patch(`/v1/projects/${projectId}`, data)
				onSuccess()
			} catch (error) {
				onError(error)
			}
		},
		[onSuccess, onError]
	)

	return patchProject
}
