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
            orderDate:{
                type:String,
                required:true
            },
            orderTime:{
                type:String,
                required: true
            },
            
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
    
   
} )

const Order = mongoose.model("Order", orderSchema)
export default Order
