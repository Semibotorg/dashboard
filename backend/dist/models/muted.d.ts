import mongoose from "mongoose";
interface Idoc extends mongoose.Document {
    GuildId: string | any;
    Users: string[] | any;
}
declare const _default: mongoose.Model<Idoc, {}, {}, {}, any>;
export default _default;
