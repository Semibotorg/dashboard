import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    antiHack: number | any,
      Enabled: string[] | any
      antiHackEnabled: boolean | any
      action:string | any
    MemberId: string[] | any
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
    antiHack: {
        type: Number,
        required: false,
      },
      Enabled: {
        type: Array,
        required: true,
      },
      antiHackEnabled: {
        type: Boolean,
        required: true,
      },
      action:{
        type: String,
        required: true
    },
    MemberId: {
      type: Array,
      required: true,
    }
})

export default mongoose.model<Idoc>("antiHack-test", Schema)