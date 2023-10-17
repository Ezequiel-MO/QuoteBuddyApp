import { toast } from 'react-toastify'
import baseAPI from '../../../../axios/axiosConfig'
import { whichDay, computeTotalDays } from '../../../../helper/helperFunctions'
import { errorToastOptions } from '../../../../helper/toast'

export const employeeExistsInCompany = async (data) => {
	const response = await baseAPI.get(`client_companies/${data.clientCompany}`)
	const companyEmployees = response.data.data.data.employees.map((el) => el._id)
	if (!companyEmployees.includes(data.clientAccManager)) {
		data.clientAccManager = ''
	}
	return data
}

export const handleUpdateProject = async (
	project,
	data,
	files,
	endPoint,
	onSuccess
) => {
	const { formData, updateTransformedData } = updatedData({
		files,
		open,
		data,
		project
	})
	const res = await baseAPI.patch(
		`projects/${project._id}`,
		updateTransformedData
	)
	onSuccess(res.data.data.data, true)
	// si se hace un update y no habia ningun pdf guardado, hace un patch guardar el pdf en otra peticion
	if (files.length > 0 && endPoint !== 'projects/image') {
		await baseAPI.patch(`projects/images/${res.data.data.data._id}`, formData)
	}
}

export const handleCreateProject = async (
	transformedData,
	formData,
	endPoint,
	onSuccess
) => {
	const res = await baseAPI.post(`${endPoint}`, transformedData)
	onSuccess(res.data.data.data, true)

	await baseAPI.patch(`${endPoint}/images/${res.data.data.data._id}`, formData)
}

export const handlePdfUpdate = async (project, data, files) => {
	const { formData, allFiles } = updatePdf({ values: data, files })
	if (allFiles.length > 1) {
		return toast.error(
			`Please delete existing images before uploading new ones`,
			errorToastOptions
		)
	}
	await baseAPI.patch(`projects/images/${project._id}`, formData)
}


////
export const transformData = ({ data, diffDays, files, open }) => {
	let formData = new FormData()
	if (open) {
		formData.append('imageContentUrl', files[0])
	}
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
	return { transformedData, formData }
}

export const updatedData = ({ data, files, open, project }) => {
	let formData = new FormData()
	if (open && files.length > 0) {
		formData.append('imageContentUrl', files[0])
	}
	let transformedData = { ...data }
	//MODIFICACION DE DIAS DE "PROJECT"
	const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
	const currentNumberDays = project?.schedule?.length
	transformedData.schedule = [...project.schedule]
	//SI SE AGREGAN MAS DIAS
	if (currentNumberDays < diffDays) {
		for (let i = 0; i < diffDays; i++) {
			if (i === currentNumberDays - 1) {
				transformedData.schedule[i].date = whichDay(i + 1, diffDays)
			}
			if (i > currentNumberDays - 1) {
				transformedData.schedule.push({
					date: whichDay(i + 1, diffDays),
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
		}
	}
	//SI SON MENOS DIAS
	if (currentNumberDays > diffDays) {
		for (let i = 0; i < currentNumberDays; i++) {
			if (i === diffDays - 1) {
				transformedData.schedule[i].date = whichDay(i + 1, diffDays)
			}
			if(i > diffDays -1){
				transformedData.schedule.pop()
			}
		}
	}
	//
	transformedData.clientAccManager = [data.clientAccManager]
	transformedData.accountManager = [data.accountManager]
	const updateTransformedData = {}
	const validations = ['deletedImage', 'imageContentUrl', 'imageUrls']
	for (let i in transformedData) {
		if (!validations.includes(i)) {
			updateTransformedData[i] = transformedData[i]
		}
	}
	return { updateTransformedData, formData }
}

export const updatePdf = ({ values, files }) => {
	let formData = new FormData()
	if (values?.imageContentUrl.length > 0) {
		formData.append('imageUrls', values.imageContentUrl)
	}
	if (values?.deletedImage?.length > 0) {
		formData.append('deletedImage', values.deletedImage)
	}
	if (files.length > 0) {
		for (let i = 0; i < files.length; i++) {
			formData.append('imageContentUrl', files[i])
		}
	}
	const allFiles = [
		...formData.getAll('imageUrls'),
		...formData.getAll('imageContentUrl')
	]
	return { formData, allFiles }
}
