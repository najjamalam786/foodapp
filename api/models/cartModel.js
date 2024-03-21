import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    _ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    pieces: {
        type: Number,
        
    },
    quantity: {
        type: Number,
        
    },
    price: {
        type: Number,
        required: true
    },
})

const userCartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userCartItems: [cartSchema]
})

const Cart = mongoose.model("Cart", userCartSchema);
export default Cart;