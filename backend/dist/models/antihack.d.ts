import mongoose from "mongoose";
interface Idoc extends mongoose.Document {
    antiHack: number | any;
    Enabled: string[] | any;
    antiHackEnabled: boolean | any;
    action: string | any;
    MemberId: string[] | any;
}
declare const _default: mongoose.Model<Idoc, {}, {}, {}, any>;
export default _default;
