import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer from './features/CurrentProjectSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import currentInvoiceReducer from './features/CurrentInvoiceSlice'

export default configureStore({
  reducer: {
    currentProject: currentProjectReducer,
    transferCompanies: transferCompaniesReducer,
    currentInvoice: currentInvoiceReducer
  }
})
