import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    loading: false,
    confirmOrder: false,
    
};


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
    addAllOrders: (state, action) => {
      state.orderItems = action.payload;
    },
    pageLoader: (state, action) => {
      state.loading = action.payload
    },
    confirmOrderPlaced: (state, action) => {
      state.confirmOrder = action.payload;
    },
    
  },
});

export const { addAllOrders, pageLoader, confirmOrderPlaced  } = orderSlice.actions;
export default orderSlice.reducer