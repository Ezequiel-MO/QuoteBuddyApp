import { useCallback } from 'react'
import baseAPI from '../../../../axios/axiosConfig'
import { computeTotalDays } from '../../../../helper/helperFunctions'
import { transformData } from './transformData'

export const usePostToEndpoint = (onSuccess, onError) => {
	const postToEndpoint = useCallback(
		async (data, endPoint, update, project) => {
			const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
			const response = await baseAPI.get(
				`client_companies/${data.clientCompany}`
			)
			const companyEmployees = response.data.data.data.employees.map(
				(el) => el._id
			)
			if (!companyEmployees.includes(data.clientAccManager)) {
				data.clientAccManager = ''
			}
			let transformedData = transformData(data, diffDays)

			try {
				if (update === true) {
					const updatedData = { ...data }
					updatedData.clientAccManager = [data.clientAccManager]
					updatedData.accountManager = [data.accountManager]
					const res = await baseAPI.patch(
						`${endPoint}/${project._id}`,
						updatedData
					)
					onSuccess(res.data.data.data)
				} else {
					const res = await baseAPI.post(`${endPoint}`, transformedData)
					onSuccess(res.data.data.data)
				}
			} catch (error) {
				onError(error)
			}
		},
		[onSuccess, onError]
	)

	return postToEndpoint
}
