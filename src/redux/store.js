import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer from './features/CurrentProjectSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import meetingValuesReducer from './features/MeetingValuesSlice'

export default configureStore({
  reducer: {
    currentProject: currentProjectReducer,
    transferCompanies: transferCompaniesReducer,
    meetingValues: meetingValuesReducer
  }
})
