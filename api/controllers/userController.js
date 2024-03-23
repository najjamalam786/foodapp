import User from "../models/userModel.js";
import Order from "../models/OrderModel.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
    
    const { username, email, password, isAdmin } = req.body;

    const encrypt_password = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: encrypt_password, isAdmin});
    
    try {
        await newUser.save();
        res.status(201).json("Successfull user created");
    } catch (error) {
        next(error);
    }
}

export const googleLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

            // hide validUser password
            const { password: passwords, ...others } = user._doc

            res
            .cookie("access_token", token, { httpOnly: true })
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
                avatar: req.body.photo,

            })
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

            const { password: passwords, ...others } = newUser._doc
            res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(others);
        }
    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email: email });
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validUser) {
            return next(errorHandler(401, "User not found!"));
        }


        if (!validPassword) {
            return next(errorHandler(404, "Wrong password"));
        }

        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);

        // hide validUser password
        const { password: passwords, ...others } = validUser._doc

        res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(others);      
        
}catch(error){
    next(error);
}
}


// Log Out User

export const logOut = async (req, res, next) => {
    res
    .clearCookie("access_token")
    .status(200)
    .json("User has been logged out");
}


// Add to cart

export const addItemToCart = async (req, res, next) => {
    const cartData = req.body;
    
    // const itemID = await User.findOne({_d: req.body.cartData._id});

    // await cartData.splice(0,0{Order_data: req.body.userCart})
    
    
    try {
        const response = await User.findOneAndUpdate({email: cartData.email,}, {$push: {userCart: cartData.userCart}},{new: true} );
        res.status(200).json(response.userCart);
    } catch (error) {
        next(error);
    }

}

// import cartData from user 
export const UserAllCartData = async(req, res, next) => {

    try {
        const response = await User.findOne({email: req.body.email});
        res.status(200).json(response.userCart);
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
        await User.findOneAndUpdate(query, updateDocument, options).then(async() => {
            
            await User.findOne({email: cartData.email}).then((response) => {
                res.status(200).json(response.userCart);
            })
        });
    } catch (error) {
        next(error);
    }
}
    

// Delete user cart

export const deleteUserCart = async(req, res, next) => {
    const cartData = req.body;
    const query = { email: cartData.email };
    
    const updateDocument = {
        $pull: { "userCart": { _id: cartData.ID } },
    };
    
    try {
        await User.findOneAndUpdate(query, updateDocument, {new: true}).then(async() => {
            
            await User.findOne({email: cartData.email}).then((response) => {
                res.status(200).json(response.userCart);
            })
        });

    } catch (error) {
        next(error);
    }
}

// Order create by user 

export const orderCreate = async(req, res, next) => {
    const orderData = req.body;
    const userE = await Order.findOne({email: orderData.email});

    if(userE == null){
        try{
            await Order.create({
                name: orderData.name,
                email: orderData.email,
                orderItems: [{foodData: orderData.orderItems, shippingAddress: orderData.shippingAddress, totalPrice: orderData.totalPrice}],
                
            }).then(() => {
                console.log("Successfull user and order created");
                res.status(200).json("Successfull user and order created");
            });
        }catch(error){
            console.log('1 error');
            next(error);
        }
    }

    else{
        try {
            await Order.findOneAndUpdate({email: orderData.email}, {$push: {orderItems: [{foodData: orderData.orderItems, shippingAddress: orderData.shippingAddress, totalPrice: orderData.totalPrice}],  } },{new: true}).then(async() => {

                await User.findOneAndUpdate({email: orderData.email}, {$set: {userCart: []}}, {new: true})
                res.status(200).json("Successfull order created");

            });
            
        } catch (error) {
            console.log('2 error');

            next(error);
        }
    }
    
}