import { useRef } from "react"
import axios from 'axios';
import baseAPI from '../../../../axios/axiosConfig'
import { useNavigate, useLocation } from 'react-router-dom'
import { computeTotalDays } from '../../../../helper/helperFunctions'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks/'
import { ProjectMasterForm } from '../form/ProjectMasterForm'
import { transformData } from './transformData'

export const ProjectSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { project }
	} = useLocation()
	const fileInput = useRef()

	const { setCurrentProject } = useCurrentProject()

	const postToEndpoint = async (data, endPoint, update, files, open) => {
		const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
		//se verifica que  "company" tenga ese "employee"
		const response = await baseAPI.get(
			`/v1/client_companies/${data.clientCompany}`
		)
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
				const updatedData = { ...data }
				updatedData.clientAccManager = [data.clientAccManager]
				updatedData.accountManager = [data.accountManager]
				const res = await baseAPI.patch(
					`v1/${endPoint}/${project._id}`,
					updatedData
				)
				localStorage.setItem(
					'currentProject',
					JSON.stringify(res.data.data.data)
				)
				setCurrentProject(res.data.data.data)
				toast.success('Project updated', toastOptions)
			}
			if (!update) {
				const res = await baseAPI.post(`v1/${endPoint}`, transformedData)
				localStorage.setItem(
					'currentProject',
					JSON.stringify(res.data.data.data)
				)
				setCurrentProject(res.data.data.data)
				// una vez que se crea hace un patch guardar el pdf en otra peticion
				await baseAPI.patch(`v1/${endPoint}/images/${res.data.data.data._id}`, formData)
				toast.success('Base Project Created', toastOptions)
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

	const submitForm = (values, endpoint, update, files, open) => {
		postToEndpoint(values, endpoint, update, files, open)
	}

	return (
		<>
			<ProjectMasterForm submitForm={submitForm} project={project} fileInput={fileInput} />
		</>
	)
}
