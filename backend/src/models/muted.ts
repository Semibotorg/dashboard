import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    GuildId: string | any,
    Users: string[] | any
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
    GuildId: { type: String, required: true },
    Users: { type: Array, required: false }
})

export default mongoose.model<Idoc>('muted', Schema)