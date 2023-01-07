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
    twitter: not_req_object,
    twitch: not_req_object,
    instagram: not_req_object,
    reddit: not_req_object,
    youtube: not_req_object,
});
exports.default = mongoose_1.default.model("alerts", Schema);
//# sourceMappingURL=alerts.js.map