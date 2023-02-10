import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	transfersOut: []
}

export const transfersOutSlice = createSlice({
	name: 'transfersOutServices',
	initialState,
	reducers: {
		ADD_TRANSFER_OUT: (state, action) => {
			state.transfersOut = [...state.transfersOut, action.payload]
		},
		UPDATE_TRANSFER_OUT: (state, action) => {
			const { units, total, vehicleCapacity } = action.payload
			state.transfersOut = state.transfersOut.map((item) => {
				if (item.vehicleCapacity === vehicleCapacity) {
					item.units = units
					item.total = total
				}
				return item
			})
		},
		REMOVE_TRANSFER_LINE: (state, action) => {
			const { vehicleCapacity } = action.payload
			state.transfersOut = state.transfersOut.filter(
				(item) => item.vehicleCapacity !== vehicleCapacity
			)
		},
		ADD_UPDATE_EXTRA_LINES: (state, action) => {
			const { units, type, total } = action.payload
			const found = state.transfersOut.some((item) => item.type === type)
			if (found) {
				state.transfersOut = state.transfersOut.map((item) => {
					if (item.type === type) {
						item.units = units
						item.total = total
					}
					return item
				})
			} else {
				state.transfersOut = [...state.transfersOut, action.payload]
			}
		}
	}
})

export const {
	ADD_TRANSFER_OUT,
	UPDATE_TRANSFER_OUT,
	REMOVE_TRANSFER_LINE,
	ADD_UPDATE_EXTRA_LINES
} = transfersOutSlice.actions

export const selectTransfersOut = (state) => state.transfersOut.transfersOut

export default transfersOutSlice.reducer
