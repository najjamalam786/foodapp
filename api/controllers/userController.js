import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
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
    const cartData = req.body.userCart;
    
    // const itemID = await User.findOne({_d: req.body.cartData._id});

    // await cartData.splice(0,0{Order_data: req.body.userCart})

    try {
        await User.findOneAndUpdate({email: req.body.email}, {$push: {userCart: cartData}}).then(() => {
            res.status(200).json("Item added to cart");
        });
    } catch (error) {
        next(error);
    }

}

// import cartData from user 
export const fetchUserCartData = async(req, res, next) => {

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
    console.log(cartData.qty)
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
        await User.findOneAndUpdate(query, updateDocument, options, {new: true}).then(() => {
            res.status(200).json("Cart updated");
        });
    } catch (error) {
        next(error);
    }
}
    