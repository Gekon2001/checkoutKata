import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
 id: string;
 name: string;
 quantity: number;
}
interface CartState {
 data: ICartItem[];
}

const initialState: CartState = {
 data: [],
};

export const cartReducer = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addCartItems: (state, action: PayloadAction<ICartItem>) => {
   const index = state.data.findIndex(({ id }) => id === action.payload.id);
   if (index + 1) {
    state.data[index].quantity =
     state.data[index].quantity + action.payload.quantity;
   } else {
    state.data.push(action.payload);
   }
  },
  resetCart: (state) => {
   state.data = [];
  },
 },
});

export const { addCartItems, resetCart } = cartReducer.actions;

export default cartReducer.reducer;
