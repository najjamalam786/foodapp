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
    mobile:{
        type:String,
        required:true
    },

    orderItems:[
        {
            monthlySub:{
                type:Boolean,
                
            },
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
            },
    
            shippingAddress:{
                type:Object,
                required:true
            },
            totalPrice:{
                type:Number,
                required:true
            },
            expireTillDate:{
                type:String,
                required:true
            },
            expireDate:{
                type:String,
                required:true
            }
            
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
