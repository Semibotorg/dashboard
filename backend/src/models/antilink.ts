import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    antiLink: string | any
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
    antiLink: req_string
})

export default mongoose.model<Idoc>('antilink-test', Schema)