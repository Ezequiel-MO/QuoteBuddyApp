import { whichDay } from '../../../../helper/helperFunctions'

export const transformData = ({ data, diffDays, files, open }) => {
	let formData = new FormData()
	if (open) {
		formData.append("imageContentUrl", files[0])
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


export const updatedData = ({ data, files, open }) => {
	let formData = new FormData()
	if (open && files.length > 0) {
		formData.append("imageContentUrl", files[0])
	}
	let transformedData = { ...data }
	transformedData.clientAccManager = [data.clientAccManager]
	transformedData.accountManager = [data.accountManager]
	const updateTransformedData = {}
	const validations = ["deletedImage",
		"imageContentUrl",
		'imageUrls'
	]
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
	const allFiles = [...formData.getAll("imageUrls"), ...formData.getAll("imageContentUrl")]
	return { formData, allFiles }
}