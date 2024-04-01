import FoodUser from "../models/fooduserModel.js";
import User from "../models/userModel.js";
import Order from "../models/OrderModel.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";



// Create User post(/api/user/signup)
export const createUser = async (req, res, next) => {
    
    const { username, email, password, isAdmin} = req.body;

    const user = await User.findOne({email});   

    if( user && user.userAuth){
        
        return res.status(400).json(null);
    }
    else if( user && !user.userAuth){
        const encrypt_password = bcryptjs.hashSync(password, 10);
        const response = await User.findOneAndUpdate({ email: user.email }, { username: username, password:encrypt_password   }, { new: true })
        return res.status(200).json(response);
    }
    else{
        const encrypt_password = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: encrypt_password, isAdmin});
        // console.log("newUser:", newUser);
        
        try {
            const response = await newUser.save();
            res.status(201).json(response);
    
        } catch (error) {
          next(error);
        }

    }
}

// Verify Phone number post(/api/user/verify-phone)
export const verifyPhone = async (req, res, next) => {
    const clientData = req.body;


    const mobileNo = await FoodUser.findOne({ mobile: clientData.mobile });
    if( mobileNo ){

        return res.status(400).json(null);

    }


    const user = await User.findOne({ email: clientData.email });

    if(user && user.userAuth){

        res.status(200).json(null);
        
    }

    else if(user && !user.userAuth) {  
        
        const user = await User.findOne({ mobile: clientData.mobile });

        if( user && user.userAuth){
            res.status(200).json(null);
        }
        else{
            try {
                const response = await User.findOneAndUpdate({ email: clientData.email}, {$set:{ mobile: clientData.mobile}}, { new: true })
        
                res.status(200).json(response);  
                
            } catch (error) {
                next(error);
            }
            
            // const response = await FoodUser.findOneAndUpdate({ mobile: clientData.mobile}, {$set:{ email: clientData.email}}, { new: true })
            // res.status(200).json(response);
        }
        
    }
    else{
        try {
            const response = await User.findOneAndUpdate({ email: clientData.email}, {$set:{ mobile: clientData.mobile}}, { new: true })
    
            res.status(200).json(response);  
            
        } catch (error) {
            next(error);
        }
            
    }
        

}

// Verify code post(/api/user/verify-code)
export const verifyCode = async (req, res, next) => {
    const code = req.body;
    try {
        const response = await User.findOneAndUpdate({mobile: code.mobile, codeID: code.code }, {userAuth: true}, { new: true });

        if(response === null){
            res.status(200).json(null);
        }else{
            await FoodUser.create({ email: response.email, password: response.password, mobile: response.mobile, codeID: response.codeID, userAuth: response.userAuth, username: response.username, isAdmin: false })

            res.status(201).json(response);
        }
        
    } catch (error) {
        next(error);
    }
}


// google Login
export const googleLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            

            // hide validUser password
            const { password: passwords, ...others } = user._doc

            res
            .status(200)
            .json(others);
        }

        else{

            const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);

            const encrypt_password = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: encrypt_password,
                isAdmin: false,
                userAuth:false,

            })
            await newUser.save();

            const { password: passwords, ...others } = newUser._doc
            res
            .status(200)
            .json(others);
        }
    } catch (error) {
        next(error);
    }
}


//Sign In User fetch('/api/user/signin'
export const signIn = async (req, res, next) => {
    const { mobile, password } = req.body;

    try {
        const validUser = await FoodUser.findOne({ mobile: mobile, userAuth: true});
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validUser) {
            return next(errorHandler(401, "User not found!"));
        }


        if (!validPassword) {
            return next(errorHandler(404, "Wrong password"));
        }      

        // hide validUser password
        const { password: passwords, ...others } = validUser._doc

        res
        .status(200)
        .json(others);      
        
}catch(error){
    next(error);
}
}


// Log Out User

export const logOut = async (req, res, next) => {
    res
    .status(200)
    .json("User has been logged out");
}

// All user Cart Data 
export const UserAllCartData = async(req, res, next) => {

    try {
        const response = await FoodUser.findOne({email: req.body.email});
        res.status(200).json(response.userCart);
    } catch (error) {
        next(error);
    }
}


// Add to cart

export const addItemToCart = async (req, res, next) => {
    const cartData = req.body;
    
    
    try {
        await FoodUser.findOneAndUpdate({email: cartData.email,}, {$push: {userCart: cartData.userCart}},{new: true} ).then(async(response) => {
            
            if(response === null){
                res.status(200).json(response);
            }else{
                await FoodUser.findOne({email: cartData.email}).then((response) => {
                    res.status(200).json(response.userCart);
                })
            }
        });
    } catch (error) {
        next(error);
    }

}

// Update user cart

export const updateUserCart = async(req, res, next) => {
    // const quantity = req.body.quantity;
    const cartData = req.body;
    

    
    const query = { email: cartData.email };
    
    const updateDocument = {
        $set: { "userCart.$[i].quantity": cartData.qty },
    };
    
    const options = {
        arrayFilters: [
            {
                "i._id": cartData.ID,
                
            }
        ]
    };

    try {
        await FoodUser.findOneAndUpdate(query, updateDocument, options).then(async() => {
            
            await FoodUser.findOne({email: cartData.email}).then((response) => {
                res.status(200).json(response.userCart);
            })
        });

    } catch (error) {
        next(error);
    }
}
    

// Delete user cart

export const deleteUserCartItems = async(req, res, next) => {
    const cartData = req.body;
    const query = { email: cartData.email };
    
    const updateDocument = {
        $pull: { "userCart": { _id: cartData.ID } },
    };
    
    try {
        await FoodUser.findOneAndUpdate(query, updateDocument, {new: true}).then(async() => {
            
            await FoodUser.findOne({email: cartData.email}).then((response) => {
                res.status(200).json(response.userCart);
            })
        });

    } catch (error) {
        next(error);
    }
}


// Order create by user .post('/ordercreate',verifyToken, orderCreate)

export const orderCreate = async(req, res, next) => {
    const orderData = req.body;
    const userE = await Order.findOne({mobile: orderData.mobile});

    if(userE == null){
        try{
            await Order.create({
                mobile: orderData.mobile,
                name: orderData.name,
                email: orderData.email,
                orderItems: [{foodData: orderData.orderItems, shippingAddress: orderData.shippingAddress, totalPrice: orderData.totalPrice, orderDate: new Date().toDateString(), orderTime: new Date().toLocaleTimeString()}],
                
            }).then(async() => {
                
                await FoodUser.findOneAndUpdate({email: orderData.email}, {$set: {userCart: []}}, {new: true}).then((response) => {
                    res.status(200).json(response.userCart);
                });
            });
        }catch(error){
            next(error);
        }
    }

    else{
        try {
            await Order.findOneAndUpdate({mobile: orderData.mobile}, {$push: {orderItems: [{foodData: orderData.orderItems, shippingAddress: orderData.shippingAddress, totalPrice: orderData.totalPrice, orderDate: new Date().toDateString(), orderTime: new Date().toLocaleTimeString()}],  } },{new: true}).then(async() => {

                await FoodUser.findOneAndUpdate({email: orderData.email}, {$set: {userCart: []}}, {new: true}).then((response) => {
                    res.status(200).json(response.userCart);
                });

            });
            
        } catch (error) {

            next(error);
        }
    }
    
}

// Delete Cart Items if "cartItems" is empty
export const deleteCartItems = async(req, res, next) => {
    const orderData = req.body;
    try {
        await FoodUser.findOneAndUpdate({email: orderData.email}, {$set: {userCart: []}}, {new: true}).then(() => {
            res.json("Cart is empty");
        });
    } catch (error) {
        next(error)
        
    }


}


// Order get by user .post('/orderdata', orderGet)

export const orderGet = async(req, res, next) => {
    const orderData = req.body;
    try {
        const response = await Order.findOne({mobile: orderData.mobile});
        
        if(response === null){
            res.status(200).json(response);
        }else{
            res.status(200).json(response.orderItems);
        }
        
    } catch (error) {
        next(error);
    }
}

// User Token Verify
// export const verifyUser = (req, res, next) => {
    
//     try {
//         // console.log("working");
//         const token = req.cookies.access_token;

//     if (!token) {
//         res.json(null);
//     }
//     } catch (error) {
//         next(error)
        
//     }
// }

// Add User address by user.post('/useraddress', verifyToken, userAddress)
export const userAddress = async (req, res, next) => {
    
    try {
        const addressData = req.body;
        const response = await FoodUser.findOneAndUpdate({email: addressData.email}, {$addToSet: {userAddress: addressData.shippingAddress}}, {new: true});
        // console.log("userAddress",response.userAddress);
        res.status(200).json(response);
    } catch (error) {
        next(error)
        
    }
}

// Get User address by user

export const getAdderss = async(req, res, next) => {
    try {
        const response = await FoodUser.findOne({email: req.body.email});
        res.status(200).json(response.userAddress);
    } catch (error) {
        next(error)
        
    }
}
