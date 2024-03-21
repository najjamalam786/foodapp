import express from "express"
import { addItemToCart, createUser, fetchUserCartData, googleLogin, logOut, signIn, updateUserCart } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router
.post("/signup", createUser)
.post('/signin', signIn)
.post('/google', googleLogin)
.get('/logout', logOut)
.post('/cart', verifyToken, addItemToCart)
.post('/cartdata', verifyToken, fetchUserCartData)
.post('/updatecart', verifyToken, updateUserCart);


export default router