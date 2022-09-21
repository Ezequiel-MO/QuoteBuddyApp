import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer from './features/CurrentProjectSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'

export default configureStore({
  reducer: {
    currentProject: currentProjectReducer,
    transferCompanies: transferCompaniesReducer
  }
})
