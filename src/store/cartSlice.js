import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
};

const cartCount = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    resetState: (state, action) => {
      state.cartCount = 0;
    },
  },
});

export const { setCartCount, resetState } = cartCount.actions;
export default cartCount.reducer;
