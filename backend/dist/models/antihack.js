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
    action: {
        type: String,
        required: true
    },
    MemberId: {
        type: Array,
        required: true,
    }
});
exports.default = mongoose_1.default.model("antiHack-test", Schema);
