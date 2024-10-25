import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
 data: number | null;
}

const initialState: CounterState = {
 data: null,
};

export const cartReducer = createSlice({
 name: "cart",
 initialState,
 reducers: {
  setData: (state, action: PayloadAction<number>) => {
   state.data = action.payload;
  },
 },
});

export const { setData } = cartReducer.actions;

export default cartReducer.reducer;
