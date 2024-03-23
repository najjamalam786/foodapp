import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orderItems:{
        type:Array,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentResult:{
        type:Object,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    // taxPrice:{
    //     type:Number,
    //     required:true
    // },
    // shippingPrice:{
    //     type:Number,
    //     required:true
    // },
    
    // isPaid:{
    //     type:Boolean,
    //     default:false
    // },
    // paidAt:{
    //     type:Date
    // },
    // isDelivered:{
    //     type:Boolean,
    //     default:false
    // },
    // deliveredAt:{
    //     type:Date
    // },
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
export default Order
