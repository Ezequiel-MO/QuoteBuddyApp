import baseAPI from '../../../../axios/axiosConfig'
import { useNavigate, useLocation } from 'react-router-dom'
import { computeTotalDays, whichDay } from '../../../../helper/helperFunctions'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks/useCurrentProject'
import { ProjectMasterForm } from '../form/ProjectMasterForm'

export const ProjectSpecs = () => {
	const navigate = useNavigate()
	const {
		state: { project }
	} = useLocation()

	const { setCurrentProject } = useCurrentProject()

	const transformData = (data, diffDays) => {
		let transformedData = { ...data }
		transformedData.clientAccManager = [data.clientAccManager]
		transformedData.accountManager = [data.accountManager]
		transformedData.schedule = []
		for (let i = 1; i <= diffDays; i++) {
			transformedData.schedule.push({
				date: whichDay(i, diffDays),
				dayOfEvent: i,
				fullDayMeetings: [],
				morningMeetings: [],
				morningEvents: [],
				lunch: [],
				afternoonMeetings: [],
				afternoonEvents: [],
				dinner: [],
				transfer_in: [],
				transfer_out: []
			})
		}
		return transformedData
	}

	const postToEndpoint = async (data, endPoint, update) => {
		const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
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
