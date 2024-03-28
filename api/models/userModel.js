import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        // unique: true
    },
    codeID: {
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default:"https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-4818c.appspot.com/o/defaultAvatar.png?alt=media&token=18e52fdb-4724-4412-aa01-c224a14dbe14",
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

const User = mongoose.model("User", userSchema)
export default User