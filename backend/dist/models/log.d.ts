import mongoose from "mongoose";
interface Idoc extends mongoose.Document {
    Log: number | any;
    channelId: string[] | any;
    Enabled: string[] | any;
}
declare const _default: mongoose.Model<Idoc, {}, {}, {}, any>;
export default _default;
