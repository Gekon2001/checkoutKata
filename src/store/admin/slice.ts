import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AdminState, IAdminDataItem } from "./types";

const initialState: AdminState = {
 data: [],
 isLoading: false,
};

export const adminSlice = createSlice({
 name: "admin",
 initialState,
 reducers: {
  setAdminData: (state, action: PayloadAction<IAdminDataItem[]>) => {
   state.data = action.payload;
  },
  updateAdminDataItem: (state, action: PayloadAction<IAdminDataItem>) => {
   const index = state.data.findIndex(({ id }) => id === action.payload.id);
   if (index + 1) {
    state.data[index] = action.payload;
   } else {
    state.data.push(action.payload);
   }
  },
  deleteAdminDataItem: (state, action: PayloadAction<string>) => {
   state.data = state.data.filter(({ id }) => id !== action.payload);
  },
  setLoadingState: (state, action: PayloadAction<boolean>) => {
   state.isLoading = action.payload;
  },
 },
});

export const {
 setAdminData,
 updateAdminDataItem,
 deleteAdminDataItem,
 setLoadingState,
} = adminSlice.actions;

export default adminSlice.reducer;
