import { configureStore } from '@reduxjs/toolkit'
import currentProjectReducer from './features/CurrentProjectSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import transfersOutReducer from './features/TransfersOutSlice'
import tranfersInReducer from './features/TransfersInSlice'

export default configureStore({
	reducer: {
		currentProject: currentProjectReducer,
		transferCompanies: transferCompaniesReducer,
		transfersOut: transfersOutReducer,
		transfersIn: tranfersInReducer
	}
})
