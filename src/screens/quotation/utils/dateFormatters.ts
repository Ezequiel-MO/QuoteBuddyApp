export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]
export const daysOfTheWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

export const formatDate = (dateString: string): string => {
	if (!dateString) return ''

	const date = new Date(dateString)
	const day = date.getDate()
	const monthIndex = date.getMonth()
	return `${months[monthIndex]} ${day}`
}

export const transformDates = (date1: string, date2: string): string => {
	if (!date1 || !date2) return 'Date range not specified'

	const date1Arr = date1.split('-')
	const date2Arr = date2.split('-')

	if (date1Arr.length < 3 || date2Arr.length < 3) {
		return 'Invalid date format'
	}

	const date1Obj = {
		month: date1Arr[1],
		day: date1Arr[2],
		year: date1Arr[0]
	}

	const date2Obj = {
		month: date2Arr[1],
		day: date2Arr[2],
		year: date2Arr[0]
	}

	const month1 = months[Number(date1Obj.month) - 1]
	const month2 = months[Number(date2Obj.month) - 1]
	const day1 = date1Obj.day
	const day2 = date2Obj.day
	const year1 = date1Obj.year
	const year2 = date2Obj.year

	if (year1 === year2) {
		if (month1 === month2) {
			return `${month1} ${day1}-${day2}, ${year1}`
		} else {
			return `${month1} ${day1} - ${month2} ${day2}, ${year1}`
		}
	} else {
		return `${month1} ${day1}, ${year1} - ${month2} ${day2}, ${year2}`
	}
}

export function getDays(date1: string, date2: string): string[] {
	if (!date1 || !date2) return ['Day 1']

	try {
		const start = new Date(date1)
		const end = new Date(date2)
		const day1 = start.getUTCDay()
		const day2 = end.getUTCDay()

		// Handle the case where dates span a week
		if (day2 < day1) {
			return [...daysOfTheWeek.slice(day1), ...daysOfTheWeek.slice(0, day2 + 1)]
		}

		return daysOfTheWeek.slice(day1, day2 + 1)
	} catch (error) {
		console.error('Error getting days:', error)
		return ['Day 1']
	}
}
