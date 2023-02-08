import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer from './features/CurrentProjectSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import currentInvoiceReducer from './features/CurrentInvoiceSlice'
import transfersOutReducer from './features/TransfersOutSlice'

export default configureStore({
	reducer: {
		currentProject: currentProjectReducer,
		transferCompanies: transferCompaniesReducer,
		transfersOut: transfersOutReducer,
		currentInvoice: currentInvoiceReducer
	}
})
