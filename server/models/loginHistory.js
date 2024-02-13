import mongoose from "mongoose";

const loginHistorySchema = mongoose.Schema({
    email:{
        type:String
    },
    SystemInfo:{
        type: mongoose.Schema.Types.Mixed,
    },
    IPAdress:{
        type:String
    },
    loginAt:{ type: Date, default: Date.now }
});

export default mongoose.model("loginHistorySchema", loginHistorySchema);