import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    antiBot: string,
    Action: string,
}

const req_string: object = {
    type: String,
    required: true
}
const not_req_string: object = {
    type: String,
    required: false
}

const Schema: mongoose.Schema = new mongoose.Schema<Idoc>({
    antiBot: req_string,
    Action:req_string
})

export default mongoose.model<Idoc>('antiBot-test', Schema)