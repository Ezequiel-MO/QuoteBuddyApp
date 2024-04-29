import { BudgetState } from "src/screens/budget/context/interfaces"
import { IRestaurant, IGift } from "src/interfaces"

export function getDayIndex(date: string, state: BudgetState) {
  let dayIndex: number | undefined
  let daySchedule = date.split(' ')
  switch (daySchedule[0]) {
    case 'Arrival':
      dayIndex = 0
      break
    case 'Day':
      dayIndex = parseInt(daySchedule[1]) - 1
      break
    case 'Departure':
      dayIndex = state.schedule.length - 1
      break
    default:
      dayIndex = undefined
      break
  }
  if (typeof dayIndex !== "number") throw Error("day not found")
  return dayIndex
}

export function existRestaurant(dayIndex: number, state: BudgetState, typeMeal: 'lunch' | 'dinner', idRestaurant: string) {
  const findRestaurant = state.schedule[dayIndex][typeMeal].restaurants.find(el => el._id === idRestaurant)
  if (!findRestaurant) throw Error("restaurant not found")
}

export function existEntertaiment(restaurant: IRestaurant, idEntertaiment: string) {
  const findEntertaiment = restaurant.entertainment?.find(el => el._id === idEntertaiment)
  if (!findEntertaiment) throw Error("entertainment not found")
}

export function existGift(gifts: IGift[], idGift: string) {
  const findGift = gifts?.find(el => el._id === idGift)
  if (!findGift) throw Error("gift not found")
}

export function existMeeting(
  dayIndex: number,
  state: BudgetState,
  typeMeeting: 'morningMeetings' | 'afternoonMeetings' | "fullDayMeetings",
  idMeeting: string,
  hotelName: string
) {
  const findMeeting = state.schedule[dayIndex][typeMeeting].meetings.find(
    el => el._id === idMeeting && el.hotelName === hotelName
  )
  if (!findMeeting) throw Error("Meeting not found")
}