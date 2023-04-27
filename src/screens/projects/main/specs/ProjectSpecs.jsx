import { useRef } from 'react'
import baseAPI from '../../../../axios/axiosConfig'
import { useNavigate, useLocation } from 'react-router-dom'
import { computeTotalDays } from '../../../../helper/helperFunctions'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks/'
import { ProjectMasterForm } from '../form/ProjectMasterForm'
import { transformData, updatedData, updatePdf } from './transformData'

export const ProjectSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { project }
	} = useLocation()
	const fileInput = useRef()

	const { setCurrentProject } = useCurrentProject()

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
			if (!update) {
				const res = await baseAPI.post(`${endPoint}`, transformedData)
				localStorage.setItem(
					'currentProject',
					JSON.stringify(res.data.data.data)
				)
				setCurrentProject(res.data.data.data)
				// una vez que se crea hace un patch guardar el pdf en otra peticion
				await baseAPI.patch(
					`${endPoint}/images/${res.data.data.data._id}`,
					formData
				)
				toast.success('Base Project Created', toastOptions)
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
				localStorage.setItem(
					'currentProject',
					JSON.stringify(res.data.data.data)
				)
				setCurrentProject(res.data.data.data)
				// si se hace un update y no habia ningun pdf guardado, hace un patch guardar el pdf en otra peticion
				if (files.length > 0 && endPoint !== 'projects/image') {
					await baseAPI.patch(
						`projects/images/${res.data.data.data._id}`,
						formData
					)
				}
				toast.success('Project updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app')
			}, 1000)
		} catch (error) {
			if (error.response.data.message.includes('clientAccManager')) {
				return toast.error(`Have not selected Client Acc.Manager`, toastOptions)
			}
			toast.error(`${error.response.data.message}`, toastOptions)
		}
	}

	const submitForm = (values, files, endPoint, update, open) => {
		postToEndpoint(values, files, endPoint, update, open)
	}

	return (
		<>
			<ProjectMasterForm
				submitForm={submitForm}
				project={project}
				fileInput={fileInput}
			/>
		</>
	)
}
