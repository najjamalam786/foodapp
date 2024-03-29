import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
    index:{
        type: Number,
        required: true
    },
    week: [{
        name: {
            type: String,
            required: true
        },
        urlParamName: {
            type: String,
            required: true
        }
    }]
});


const Week = mongoose.model("Week", weekSchema);

export default Week;
