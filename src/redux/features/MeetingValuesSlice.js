import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  meetingValues: {
    roomCapacity: '',
    HDRate: '',
    FDRate: '',
    HDDDR: '',
    FDDDR: '',
    cofeeBreakUnits: '',
    coffeeBreakPrice: '',
    workingLunchUnits: '',
    workingLunchPrice: '',
    aavvPackage: '',
    hotelDinnerUnits: '',
    hotelDinnerPrice: '',
    introduction: ''
  }
}

export const meetingValuesSlice = createSlice({
  name: 'meetingValues',
  initialState,
  reducers: {
    RESET_MEETING_VALUES: (state) => {
      state.meetingValues = {
        roomCapacity: '',
        HDRate: '',
        FDRate: '',
        HDDDR: '',
        FDDDR: '',
        cofeeBreakUnits: '',
        coffeeBreakPrice: '',
        workingLunchUnits: '',
        workingLunchPrice: '',
        aavvPackage: '',
        hotelDinnerUnits: '',
        hotelDinnerPrice: '',
        introduction: ''
      }
    }
  }
})

export const { RESET_MEETING_VALUES } = meetingValuesSlice.actions

export const selectMeetingValues = (state) => state.meetingValues.meetingValues

export default meetingValuesSlice.reducer
