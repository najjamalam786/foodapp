import express from 'express'
import mongoose from 'mongoose'
import itemRouter from './routers/itemRouter.js'
import userRouter from './routers/userRouter.js'
import cookieParser from 'cookie-parser';
import {} from "dotenv/config.js"



const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/food-delivery")
    .then(() => {console.log("Connected to MongoDB");
})
.catch((error) => console.log(error))

app.use(express.json());
app.use(cookieParser());

app.use('/api/item', itemRouter);
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log("Server is running on port 8000");
})



app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        
    })
})