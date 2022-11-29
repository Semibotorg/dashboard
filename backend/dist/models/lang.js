"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const req_string = {
    type: String,
    required: true
};
const not_req_string = {
    type: String,
    required: false
};
const Schema = new mongoose_1.default.Schema({
    GuildId: req_string,
    lang: req_string,
});
exports.default = mongoose_1.default.model('language', Schema);
//# sourceMappingURL=lang.js.map