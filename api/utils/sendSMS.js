import User from "../models/userModel.js";
import {} from "dotenv/config.js";
import Twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN ;


const client = Twilio(accountSid, authToken);
const sendSMS = async (toMobile, msg) => {
    let msgOption = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: toMobile,
        body: msg,
    };
    
    try {
        await client.messages.create(msgOption);
        
    } catch (error) {
        console.log("error SMS");
    }
}

// post('/api/user/message', getMessage);
export const getMessage = async (req, res, next) => {
    try {
        sendSMS(req.body.mobile, req.body.message);
        await User.findOneAndUpdate({ email: req.body.email }, { codeID: req.body.codeID }, { new: true })
        res.status(200).json({ message: "Message sent" });

    } catch (error) {
        next(error)
        
    }
}
