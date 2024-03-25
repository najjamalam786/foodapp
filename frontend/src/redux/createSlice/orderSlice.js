import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    
};


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
    addAllOrders: (state, action) => {
      state.orderItems = action.payload;
    },
    
  },
});

export const { addAllOrders } = orderSlice.actions;
export default orderSlice.reducer