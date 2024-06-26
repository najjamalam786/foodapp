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
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User