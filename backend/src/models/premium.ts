import mongoose from "mongoose";

interface Idoc extends mongoose.Document {
    GuildId: string | any,
    startDate: Date | any,
    endDate: Date | any,
    paymentId: string | any,
    lifeTime: boolean | any
}

const req_string: object = {
    type: String,
    required: true
}
const req_date: object = {
    type: Date,
    required: true
}


const Schema: mongoose.Schema = new mongoose.Schema<Idoc>({
    GuildId: req_string,
    startDate: req_date,
    endDate: req_date,
    paymentId: req_string,
    lifeTime: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model<Idoc>('premiumSubscriptions', Schema)