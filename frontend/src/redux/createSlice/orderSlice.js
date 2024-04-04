import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    loading: false,
    confirmOrder: false,
    monthlySub: false,
    
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
    monthlySubscription: (state, action) => {
      state.monthlySub = action.payload;
    }
    
  },
});

export const { addAllOrders, pageLoader, confirmOrderPlaced, monthlySubscription  } = orderSlice.actions;
export default orderSlice.reducer