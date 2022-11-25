import mongoose from "mongoose";
interface Idoc extends mongoose.Document {
    GuildId: string | any;
    Prefix: string | any;
}
declare const _default: mongoose.Model<Idoc, {}, {}, {}, any>;
export default _default;
