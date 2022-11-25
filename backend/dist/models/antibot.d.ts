import mongoose from "mongoose";
interface Idoc extends mongoose.Document {
    antiBot: string;
    Action: string;
}
declare const _default: mongoose.Model<Idoc, {}, {}, {}, any>;
export default _default;
