import { whichDay } from '../../../../helper/helperFunctions'

export const transformData = ({data, diffDays , files , open}) => {
	let formData = new FormData()
	if(open){
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
	return {transformedData , formData}
}
