"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const premium_1 = __importDefault(require("../../models/premium"));
const router = (0, express_1.Router)();
function isExpired(date) {
    const currentDate = new Date();
    return currentDate >= date.endDate;
}
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const jwtResult = (0, utils_1.decodeJWT)(authorization);
    const GuildId = req.body.guild_id;
    try {
        const data = yield premium_1.default.findOne({ GuildId });
        if (!data) {
            return res.status(500).send({ error: `Can't find data` });
        }
        if (data.lifeTime) {
            return res.status(200).send(Object.assign({ active: true }, data));
        }
        else {
            return res.status(200).send(Object.assign({ active: !isExpired(data) }, data));
        }
    }
    catch (err) {
        if (err)
            return res.status(500).send({ error: 'Error checking subscription status' });
    }
}));
exports.default = router;
//# sourceMappingURL=premiumStatus.js.map