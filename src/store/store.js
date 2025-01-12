import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  catalog: productSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
