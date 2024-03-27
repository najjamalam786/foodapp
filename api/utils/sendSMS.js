import {} from "dotenv/config.js";
import Twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN ;


const client = Twilio(accountSid, authToken);
const sendSMS = async (msg) => {
    let msgOption = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TWILIO_TO_NUMBER,
        body: msg,
    };
    
    try {
        await client.messages.create(msgOption);
        
    } catch (error) {
        console.log("error");
    }
}

// post('/api/user/message', getMessage);
export const getMessage = async (req, res, next) => {
    try {
        sendSMS(req.body.message);
        res.status(200).json({ message: "Message sent" });

    } catch (error) {
        next(error)
        
    }
}
