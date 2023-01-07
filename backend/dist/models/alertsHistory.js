"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const req_string = {
    type: String,
    required: true,
};
const req_arr = {
    type: Array,
    required: true,
};
const not_req_arr = {
    type: Array,
    required: false,
};
const not_req_string = {
    type: String,
    required: false,
};
const req_boolean = {
    type: Boolean,
    required: true,
};
const not_req_object = {
    type: Object,
    required: false,
};
const Schema = new mongoose_1.default.Schema({
    GuildId: req_string,
    TwitterHistory: not_req_arr,
    InstagramHistory: not_req_arr,
    TwitchHistory: not_req_arr,
    RedditHistory: not_req_arr,
    YoutubeHistory: not_req_arr,
});
exports.default = mongoose_1.default.model("alertsHistory", Schema);
//# sourceMappingURL=alertsHistory.js.map