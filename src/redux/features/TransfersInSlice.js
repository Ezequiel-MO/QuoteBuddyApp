import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transfersIn: []
}

export const transfersInSlice = createSlice({
    name: "transfersInServices",
    initialState,
    reducers: {
        ADD_TRANSFER_IN: (state, action) => {
            state.transfersIn = [...state.transfersIn, action.payload]
        },
        UPDATE_TRANSFER_IN: (state, action) => {
            const { units, 
                total, 
                vehicleCapacity,
                company,
            } = action.payload
            state.transfersIn = state.transfersIn.map(el => {
                if (el.vehicleCapacity === vehicleCapacity && el.company === company) {
                    el.units = units
                    el.total = total
                    el.vehicleCapacity = vehicleCapacity
                    el.nrVehicles = units
                    el.transfer_in = total
                }
                return el
            })
        },
        REMOVE_TRANSFER_LINE: (state, action) => {
            const {  idCompany , type } = action.payload
            if(type){
                const filterCompanies = state.transfersIn.filter(
                    el => el.type !== type
                )
                state.transfersIn = filterCompanies
            }
            const filterCompanies = state.transfersIn.filter(
                el => el.idCompany  !== idCompany
            )
            state.transfersIn = filterCompanies
        },
        ADD_UPDATE_EXTRA_LINES: (state, action) => {
            const { units, type, total } = action.payload
            const found = state.transfersIn.some(el => el.type.includes(type))
            if (found) {
                state.transfersIn = state.transfersIn.map(el => {
                    if (el.type.includes(type)) {
                        el.units = units
                        el.total = total
                    }
                    return el
                })
            } else {
                state.transfersIn = [...state.transfersIn, action.payload]
            }
        }
    }
})


export const {
    ADD_TRANSFER_IN,
    UPDATE_TRANSFER_IN,
    REMOVE_TRANSFER_LINE,
    ADD_UPDATE_EXTRA_LINES
} = transfersInSlice.actions

export const selectTransfersIn = state => state.transfersIn.transfersIn

export default transfersInSlice.reducer