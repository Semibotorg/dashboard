import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
      Log: number | any
      channelId: string[] | any
      Enabled: string[] | any
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
    Log: {
        type: Number,
        required: true,
      },
      channelId: {
        type: Array,
        required: true
      },
      Enabled: {
        type: Array,
        required: true
      }
})

export default mongoose.model<Idoc>('Log-test', Schema)