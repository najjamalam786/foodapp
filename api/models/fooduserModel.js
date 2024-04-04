import mongoose from "mongoose";

const fooduserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
    },
    codeID: {
        type: String
    },
    userAuth: {
        type: Boolean,
        default: false
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userCart: {
        type: Object,
        default: {}
    },
    monthlySub: {
        success: {
            type: Boolean,
            default: false
        },
        saveDate: {
            type: String
        },
        expireDate: {
            type: String
        }
    },
    userAddress:{
            type: Object,
            default: {}
    }
}, {
    timestamps: true
})

const FoodUser = mongoose.model("Food_user", fooduserSchema)
export default FoodUser