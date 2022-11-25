import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    GuildId: string | any,
    Message: string | any,
    ChannelId: string | any
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
    GuildId: req_string,
    Message: req_string,
    ChannelId: req_string
})

export default mongoose.model<Idoc>('Welcome', Schema)