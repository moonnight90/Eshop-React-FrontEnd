import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import cartCount from "./cartSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  catalog: productSlice,
  cartCount,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
