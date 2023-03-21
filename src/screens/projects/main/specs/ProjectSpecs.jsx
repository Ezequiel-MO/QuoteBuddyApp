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

	const { setCurrentProject } = useCurrentProject()

	const postToEndpoint = async (data, endPoint, update) => {
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
		let transformedData = transformData(data, diffDays)

		try {
			if (update === true) {
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
			} else {
				const res = await baseAPI.post(`v1/${endPoint}`, transformedData)
				localStorage.setItem(
					'currentProject',
					JSON.stringify(res.data.data.data)
				)
				setCurrentProject(res.data.data.data)
				toast.success('Base Project Created', toastOptions)
			}
			navigate('/app')
		} catch (error) {
			if (error.response.data.message.includes('clientAccManager')) {
				return toast.error(`Have not selected Client Acc.Manager`, toastOptions)
			}
			toast.error(`${error.response.data.message}`, toastOptions)
		}
	}

	const submitForm = (values, endpoint, update) => {
		postToEndpoint(values, endpoint, update)
	}

	return (
		<>
			<ProjectMasterForm submitForm={submitForm} project={project} />
		</>
	)
}
