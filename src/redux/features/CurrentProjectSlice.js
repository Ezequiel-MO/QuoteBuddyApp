import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  project: JSON.parse(localStorage.getItem('currentProject')) || {}
}

export const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
    SET_CURRENT_PROJECT: (state, action) => {
      state.project = action.payload
    },
    ADD_HOTEL_TO_PROJECT: (state, action) => {
      return {
        ...state,
        project: {
          ...state.project,
          hotels: [...state.project.hotels, action.payload]
        }
      }
    },
    ADD_EVENT_TO_SCHEDULE: (state, action) => {
      const { dayOfEvent, timeOfEvent, event } = action.payload
      const typesTransfers = [ "transfer_in" , "transfer_out" ]
      if (typesTransfers.includes(timeOfEvent) ) {
        state.project.schedule[dayOfEvent][`${timeOfEvent}`] = []
        state.project.schedule[dayOfEvent][`${timeOfEvent}`] = [...state.project.schedule[dayOfEvent][`${timeOfEvent}`] , event].flat(2)
      }
      // if (timeOfEvent === "transfer_out") {
      //   state.project.schedule[dayOfEvent].transfer_out = []
      //   state.project.schedule[dayOfEvent].transfer_out = [...state.project.schedule[dayOfEvent].transfer_in, event].flat(2)
      // }
      if (!typesTransfers.includes(timeOfEvent) ) {
        return {
          ...state,
          project: {
            ...state.project,
            schedule: state.project.schedule.map((day, index) => {
              if (index === dayOfEvent) {
                return {
                  ...day,
                  [timeOfEvent]: [...day[timeOfEvent], event].flat(2)
                }
              }
              return day
            })
          }
        }
      }
    },
    REMOVE_HOTEL_FROM_PROJECT: (state, action) => {
      return {
        ...state,
        project: {
          ...state.project,
          hotels: state.project.hotels.filter(
            (hotel) => hotel._id !== action.payload
          )
        }
      }
    },
    REMOVE_EVENT_FROM_SCHEDULE: (state, action) => {
      const { dayOfEvent, timeOfEvent, eventId } = action.payload
      return {
        ...state,
        project: {
          ...state.project,
          schedule: state.project.schedule.map((day, index) => {
            if (index === dayOfEvent) {
              return {
                ...day,
                [timeOfEvent]: day[timeOfEvent].filter(
                  (event) => event._id !== eventId
                )
              }
            }
            return day
          })
        }
      }
    },
    REMOVE_TRANSFER_FROM_SCHEDULE: (state, action) => {
      if (action.payload === 'transfer_in') {
        return {
          ...state,
          project: {
            ...state.project,
            schedule: state.project.schedule.map((day, index) => {
              if (index === 0) {
                return {
                  ...day,
                  transfer_in: []
                }
              }
              return day
            })
          }
        }
      } else if (action.payload === 'transfer_out') {
        return {
          ...state,
          project: {
            ...state.project,
            schedule: state.project.schedule.map((day, index) => {
              if (index === state.project.schedule.length - 1) {
                return {
                  ...day,
                  transfer_out: []
                }
              }
              return day
            })
          }
        }
      } else {
        return state
      }
    },
    EXPAND_TRANSFERS_TO_OPTIONS: (state) => {
      return {
        ...state,
        project: {
          ...state.project,
          schedule: state.project.schedule.map((day) => {
            return {
              ...day,
              morningEvents: day.morningEvents.map((event) => {
                if (event.transfer) {
                  return {
                    ...event,
                    transfer: day.morningEvents[0].transfer
                  }
                }
                return event
              }),
              lunch: day.lunch.map((event) => {
                if (event.transfer) {
                  return {
                    ...event,
                    transfer: day.lunch[0].transfer
                  }
                }
                return event
              }),
              afternoonEvents: day.afternoonEvents.map((event) => {
                if (event.transfer) {
                  return {
                    ...event,
                    transfer: day.afternoonEvents[0].transfer
                  }
                }
                return event
              }),
              dinner: day.dinner.map((event) => {
                if (event.transfer) {
                  return {
                    ...event,
                    transfer: day.dinner[0].transfer
                  }
                }
                return event
              })
            }
          })
        }
      }
    },
    CLEAR_PROJECT: (state) => {
      state.project = {}
    }
  }
})

export const {
  SET_CURRENT_PROJECT,
  ADD_HOTEL_TO_PROJECT,
  ADD_EVENT_TO_SCHEDULE,
  REMOVE_HOTEL_FROM_PROJECT,
  REMOVE_EVENT_FROM_SCHEDULE,
  REMOVE_TRANSFER_FROM_SCHEDULE,
  EXPAND_TRANSFERS_TO_OPTIONS,
  CLEAR_PROJECT
} = currentProjectSlice.actions

export const selectCurrentProject = (state) => state.currentProject.project

export default currentProjectSlice.reducer
