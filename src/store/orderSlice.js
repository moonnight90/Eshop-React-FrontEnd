import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingCheckout: false,
  total: 0,
  products: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    orderCompleted: (state) => {
      state.products = [];
      state.total = 0;
      state.pendingCheckout = false;
    },
    setOrder: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.pendingCheckout = true;
    },
  },
});

export const { orderCompleted, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
