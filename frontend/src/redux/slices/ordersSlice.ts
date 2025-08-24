import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Product, OrderStatus } from "@/types";

type SliceState = {
  cart: {
    orderId: number | null;
    products: Product[];
    status: OrderStatus;
  };
};

const initialState: SliceState = {
  cart: {
    orderId: null,
    products: [],
    status: "created",
  },
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      state.cart.products.push(product);
    },
    increment: (state, action) => {},
    decrement: (state, action) => {},
  },
});

export const { addToCart } = ordersSlice.actions;
export default ordersSlice.reducer;
export const selectCart = (state: RootState) => state.orders.cart;
