import express from "express"
import { addItemToCart, createUser, UserAllCartData, googleLogin, logOut, signIn, updateUserCart, orderCreate, orderGet, verifyUser, deleteUserCartItems, deleteCartItems, userAddress, getAdderss } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";
import { getMessage } from "../utils/sendSMS.js";

const router = express.Router();

router
.post("/signup", createUser)
.post('/signin', signIn)
.post('/google', googleLogin)
.get('/logout', logOut)
.post('/allcart', verifyToken, UserAllCartData)
.post('/cart', verifyToken, addItemToCart)
.post('/updatecart', verifyToken, updateUserCart)
.post('/deleteusercart', verifyToken, deleteUserCartItems)
.post('/deletecartItems', verifyToken, deleteCartItems)
.post('/ordercreate',verifyToken, orderCreate)
.post('/orderdata',verifyToken, orderGet)
.get("/verify", verifyUser)
.post('/useraddress', verifyToken, userAddress)
.post('/getaddress', verifyToken, getAdderss)
.post("/message",verifyToken, getMessage);
// .post('/reverse', verifyToken, reverseOrder);


export default router