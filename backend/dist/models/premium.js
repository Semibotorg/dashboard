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
const req_date = {
    type: Date,
    required: true
};
const Schema = new mongoose_1.default.Schema({
    GuildId: req_string,
    startDate: req_date,
    endDate: req_date,
    paymentId: req_string,
    lifeTime: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.default.model('premiumSubscriptions', Schema);
//# sourceMappingURL=premium.js.map