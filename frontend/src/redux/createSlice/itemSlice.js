import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    foodItems: [],
    showCart: false,
    cartItems: [],
    totalPrice: 0,
  };

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    
  
    // todoItems(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload)
    //   todo.completed = !todo.completed
    // },
    itemAdded(state, action) {
      state.foodItems = action.payload;
    },
    itemShowCart(state, action) {
      state.showCart = action.payload;
    },
    addCartItems(state, action) {
      state.cartItems = action.payload;
    },
    addTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    
    
  },
})

export const { signInUser, itemAdded, itemShowCart, addCartItems, addTotalPrice  } = itemSlice.actions
export default itemSlice.reducer