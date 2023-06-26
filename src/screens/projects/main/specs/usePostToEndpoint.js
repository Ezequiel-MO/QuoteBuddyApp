import { toast } from 'react-toastify'
import baseAPI from '../../../../axios/axiosConfig'
import { computeTotalDays } from '../../../../helper/helperFunctions'
import { transformData, updatePdf, updatedData } from './transformData'
import { errorToastOptions } from '../../../../helper/toast'
import { useNavigate } from 'react-router-dom'

export const usePostToEndpoint = (project, onSuccess, onError) => {
	const navigate = useNavigate()

	const postToEndpoint = async (data, files, endPoint, update, open) => {
		const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
		//se verifica que  "company" tenga ese "employee"
		const response = await baseAPI.get(`client_companies/${data.clientCompany}`)
		const companyEmployees = response.data.data.data.employees.map(
			(el) => el._id
		)
		if (!companyEmployees.includes(data.clientAccManager)) {
			data.clientAccManager = ''
		}
		let { transformedData, formData } = transformData({
			data: data,
			diffDays: diffDays,
			files: files,
			open: open
		})

		try {
			if (update) {
				const { formData, updateTransformedData } = updatedData({
					files: files,
					open: open,
					data: data
				})
				const res = await baseAPI.patch(
					`projects/${project._id}`,
					updateTransformedData
				)
				onSuccess(res.data.data.data, true)

				// si se hace un update y no habia ningun pdf guardado, hace un patch guardar el pdf en otra peticion
				if (files.length > 0 && endPoint !== 'projects/image') {
					await baseAPI.patch(
						`projects/images/${res.data.data.data._id}`,
						formData
					)
				}
			}
			if (!update) {
				const res = await baseAPI.post(`${endPoint}`, transformedData)
				onSuccess(res.data.data.data, true)
				// una vez que se crea hace un patch guardar el pdf en otra peticion
				await baseAPI.patch(
					`${endPoint}/images/${res.data.data.data._id}`,
					formData
				)
			}
			if (endPoint === 'projects/image') {
				const { formData, allFiles } = updatePdf({ values: data, files: files })
				if (allFiles.length > 1) {
					return toast.error(
						`Please delete existing images before uploading new ones`,
						errorToastOptions
					)
				}
				await baseAPI.patch(`projects/images/${project._id}`, formData)
			}
			setTimeout(() => {
				navigate('/app')
			}, 1000)
		} catch (error) {
			onError(error.response.data.message)
		}
	}

	return postToEndpoint
}
