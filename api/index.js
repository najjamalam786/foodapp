import express from 'express'
import mongoose from 'mongoose'
import itemRouter from './routers/itemRouter.js'
import userRouter from './routers/userRouter.js'
import cookieParser from 'cookie-parser';
import {} from "dotenv/config.js"
import path from 'path';


const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {console.log("Connected to MongoDB");
})
.catch((error) => console.log(error))

const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());

app.use('/api/item', itemRouter);
app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});


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
