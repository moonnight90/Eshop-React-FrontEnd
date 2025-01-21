import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    categories: [],
    price: [null, null],
  },
  ordering: {
    sort_by: "title",
    order: "asc",
  },
  page: 1,
  q: "",
};

const productSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.filters.categories = action.payload;
    },
    updatePrice: (state, action) => {
      state.filters.price = action.payload;
    },
    updateOrdering: (state, action) => {
      state.ordering.sort_by = action.payload.sort_by;
      state.ordering.order = action.payload.order;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateSearchQuery: (state, action) => {
      state.q = action.payload;
    },
    reset: (state, action) => {
      state.filters = {
        categories: [],
        price: [null, null],
      };
      state.ordering = {
        sort_by: "title",
        order: "asc",
      };
      state.page = 1;
      state.q = "";
    },
  },
});

export const {
  updateCategories,
  updatePage,
  updatePrice,
  updateOrdering,
  updateSearchQuery,
  reset,
} = productSlice.actions;

export default productSlice.reducer;
