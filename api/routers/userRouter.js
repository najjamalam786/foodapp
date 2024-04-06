import express from "express"
import { addItemToCart, createUser, UserAllCartData, googleLogin, logOut, signIn, updateUserCart, orderCreate, orderGet, deleteUserCartItems, deleteCartItems, userAddress, getAdderss, verifyPhone, verifyCode, monthlySubscription, expireMonthlySub } from "../controllers/userController.js";
import { getHelp, getMessage } from "../utils/sendSMS.js";

const router = express.Router();

router
.post("/sign-up", createUser)
.post("/verify-mobile", verifyPhone)
.post("/verify-code", verifyCode)
.post('/signin', signIn)
.post('/google', googleLogin)
.get('/logout', logOut)
.post('/allcart', UserAllCartData)
.post("/expiremonthlysub", expireMonthlySub)
.post('/monthlysub', monthlySubscription)
.post('/cart', addItemToCart)
.post('/updatecart', updateUserCart)
.post('/deleteusercart', deleteUserCartItems)
.post('/deletecartItems',deleteCartItems)
.post('/ordercreate', orderCreate)
.post('/orderdata',orderGet)
.post('/useraddress', userAddress)
.post('/getaddress', getAdderss)
.post("/message", getMessage)
.post('/help', getHelp);
// .post('/reverse', verifyToken, reverseOrder);


export default router