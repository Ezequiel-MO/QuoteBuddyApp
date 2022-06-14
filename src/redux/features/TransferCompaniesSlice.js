import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transferCos: JSON.parse(localStorage.getItem("uniqueCompanies")) || [],
};

export const transferCompaniesSlice = createSlice({
  name: "transferCompanies",
  initialState,
  reducers: {
    SET_TRANSFER_COMPANIES: (state, action) => {
      state.transferCos = action.payload;
    },
  },
});

export const { SET_TRANSFER_COMPANIES } = transferCompaniesSlice.actions;

export const selectTransferCompanies = (state) =>
  state.transferCompanies.transferCos;

export default transferCompaniesSlice.reducer;
