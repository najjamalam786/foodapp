import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },

    orderItems:[
        {
            monthlySub:{
                type:Boolean,
                
            },
            orderDate:{
                type:String,
            },
            orderTime:{
                type:String,
            },
            
            foodData:{
                type:Array,
            },
    
            shippingAddress:{
                type:Object,
            },
            totalPrice:{
                type:Number,
            },
            expireTillDate:{
                type:String,
            },
            expireDate:{
                type:String,
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
