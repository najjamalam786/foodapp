import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    userAddress:{
            type: Object,
            default: {}
    }
}, {
    timestamps: true
})

const User = mongoose.model("Food_user", userSchema)
export default User