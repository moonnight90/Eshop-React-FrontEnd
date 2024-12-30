import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
