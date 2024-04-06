import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
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
    confirmOrderPlaced: (state, action) => {
      state.confirmOrder = action.payload;
    },
    monthlySubscription: (state, action) => {
      state.monthlySub = action.payload;
    }
    
  },
});

export const { addAllOrders, confirmOrderPlaced, monthlySubscription  } = orderSlice.actions;
export default orderSlice.reducer