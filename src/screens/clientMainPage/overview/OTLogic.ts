import { IDay } from '@interfaces/project'
import * as dateConstants from '../../../constants/dates'

const { months, daysOfTheWeek } = dateConstants

interface DateObject {
	month: string
	day: string
	year: string
}

type TimeOfDay = 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'

const OTLogic = () => {
	const transformDates = (date1: string, date2: string) => {
		const date1Arr = date1.split('-')
		const date2Arr = date2.split('-')

		const date1Obj: DateObject = {
			month: date1Arr[1],
			day: date1Arr[2],
			year: date1Arr[0]
		}
		const date2Obj: DateObject = {
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
				return `${month1} ${day1}, ${month2} ${day2}, ${year1}`
			}
		} else {
			return `${month1} ${day1}, ${year1} - ${month2} ${day2}, ${year2}`
		}
	}
	const getDays = (date1: string, date2: string) => {
		let day1 = new Date(date1).getUTCDay()
		let day2 = new Date(date2).getUTCDay()

		return [...daysOfTheWeek.slice(day1, day2 + 1)]
	}

	const getEvents = (schedule: IDay[], timeOfDay: TimeOfDay) => {
		const eventsArr = schedule.map((day) => {
			if (timeOfDay === 'morningEvents' || timeOfDay === 'afternoonEvents') {
				return day[timeOfDay].events.map((event) => {
					return {
						name: event.name,
						id: event._id
					}
				})
			}
			if (timeOfDay === 'lunch' || timeOfDay === 'dinner') {
				return day[timeOfDay].restaurants.map((restaurant) => {
					return {
						name: restaurant.name,
						id: restaurant._id
					}
				})
			}
		})
		return eventsArr.filter((event) => event !== undefined)
	}

	const renderEvent = (arr: any[]) => {
		if (arr.length === 0) {
			return 'No events scheduled'
		} else if (arr.length === 1) {
			return arr[0].name
		} else {
			return arr.map((event) => event.name).join('/')
		}
	}

	return { transformDates, getDays, getEvents, renderEvent }
}

export default OTLogic
