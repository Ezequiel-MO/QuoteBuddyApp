import { IProject } from 'src/interfaces'
import { whichDay, computeTotalDays } from '../../../../helper/helperFunctions'

interface IProjectValues {
	arrivalDay: string
	departureDay: string
	deletedImage?: string[]
	[key: string]: any
}

export const ProjectFormData = {
	create: (data: any, files: File[], open: boolean) => {
		let formData = new FormData()
		if (open) {
			formData.append('imageContentUrl', files[0])
		}
		let transformedData = { ...(data as IProject & IProjectValues) }
		const diffDays = computeTotalDays(data.arrivalDay, data.departureDay)
		transformedData.clientAccManager = [data.clientAccManager]
		transformedData.accountManager = [data.accountManager]
		transformedData.schedule = []
		for (let i = 1; i <= diffDays; i++) {
			transformedData.schedule.push({
				date: whichDay(i, diffDays),
				// dayOfEvent: i,
				fullDayMeetings: {
					intro: '',
					meetings: []
				},
				morningMeetings: {
					intro: '',
					meetings: []
				},
				morningEvents: {
					intro: '',
					events: []
				},
				lunch: {
					intro: '',
					restaurants: []
				},
				afternoonMeetings: {
					intro: '',
					meetings: []
				},
				afternoonEvents: {
					intro: '',
					events: []
				},
				dinner: {
					intro: '',
					restaurants: []
				},
				transfer_in: [],
				transfer_out: [],
				itinerary: {
					intro: "",
					itinerary: [],
					starts: "",
					ends: "",
					activity: {
						events: [],
						intro: ""
					},
					lunch: {
						intro: "",
						restaurants: [],
					},
					dinner: {
						intro: "",
						restaurants: []
					}
				},
				overnight: {
					intro: '',
					hotels: []
				}
			})
		}
		return { transformedData, formData }
	},
	update: (data: any, files: File[], open: boolean, project: IProject) => {
		let formData = new FormData()
		if (open && files.length > 0) {
			formData.append('imageContentUrl', files[0])
		}
		let transformedData = { ...(data as IProject & IProjectValues) }
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
						// dayOfEvent: i,
						fullDayMeetings: {
							intro: '',
							meetings: []
						},
						morningMeetings: {
							intro: '',
							meetings: []
						},
						morningEvents: {
							intro: '',
							events: []
						},
						lunch: {
							intro: '',
							restaurants: []
						},
						afternoonMeetings: {
							intro: '',
							meetings: []
						},
						afternoonEvents: {
							intro: '',
							events: []
						},
						dinner: {
							intro: '',
							restaurants: []
						},
						transfer_in: [],
						transfer_out: [],
						itinerary: {
							intro: "",
							itinerary: [],
							starts: "",
							ends: "",
							activity: {
								events: [],
								intro: ""
							},
							lunch: {
								intro: "",
								restaurants: [],
							},
							dinner: {
								intro: "",
								restaurants: []
							}
						},
						overnight: {
							intro: '',
							hotels: []
						}
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
				if (i > diffDays - 1) {
					transformedData.schedule.pop()
				}
			}
		}
		transformedData.clientAccManager = [data.clientAccManager]
		transformedData.accountManager = [data.accountManager]
		const updateTransformedData: { [key: string]: IProject & IProjectValues } =
			{}
		const validations = ['deletedImage', 'imageContentUrl', 'imageUrls']
		for (let i in transformedData) {
			if (!validations.includes(i)) {
				updateTransformedData[i] = transformedData[i]
			}
		}
		return { updateTransformedData, formData }
	},
	updatePdf: (values: IProject & IProjectValues, files: File[]) => {
		let formData = new FormData()
		if (values?.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl.join(','))
		}
		if (values.deletedImage && values?.deletedImage?.length > 0) {
			formData.append('deletedImage', values.deletedImage.join(','))
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	}
}
