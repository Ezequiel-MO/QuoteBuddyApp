import { BudgetState } from "src/screens/budget/context/interfaces"
import { IRestaurant } from "src/interfaces"

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