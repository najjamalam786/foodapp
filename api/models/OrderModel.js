import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    orderItems:[
        {
            foodData:{
                type:Array,
                required:true,
            },
    
            shippingAddress:{
                type:Object,
                required:true
            },
            totalPrice:{
                type:Number,
                required:true
            },
        }
    ],
    paymentMethod:{
        type:String,
    },
    paymentResult:{
        type:Object,
    },
   
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
export default Order
