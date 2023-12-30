import mongoose from "mongoose";
import ICall from "../interface/call.interface";

const callSchema = new mongoose.Schema<ICall>({

})

const CallModel = mongoose.model("Call", callSchema)
export default CallModel
