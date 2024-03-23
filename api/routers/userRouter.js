import express from "express"
import { addItemToCart, createUser, UserAllCartData, googleLogin, logOut, signIn, updateUserCart, deleteUserCart } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router
.post("/signup", createUser)
.post('/signin', signIn)
.post('/google', googleLogin)
.get('/logout', logOut)
.post('/cart', verifyToken, addItemToCart)
.post('/allcart', verifyToken, UserAllCartData)
.post('/updatecart', verifyToken, updateUserCart)
.post('/deleteusercart', verifyToken, deleteUserCart);


export default router