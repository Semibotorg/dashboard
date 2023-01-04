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
const v10_1 = require("discord-api-types/v10");
const index_1 = require("../../bot/index");
const premium_1 = __importDefault(require("../../models/premium"));
const router = (0, express_1.Router)();
function isExpired(date) {
    const currentDate = new Date();
    return currentDate >= date.endDate;
}
function daysLeft(date) {
    const currentDate = new Date();
    const endDate = new Date(date.endDate);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const params = req.params;
    const GuildId = params.id;
    const jwtResult = (0, utils_1.decodeJWT)(authorization);
    const guild = index_1.client.guilds.cache.get(GuildId);
    const member = yield (guild === null || guild === void 0 ? void 0 : guild.members.fetch({ user: jwtResult.user.id }));
    if (!member)
        return res.status(400).send({ msg: 'member not found inside the guild' });
    if (!member.permissions.has(v10_1.PermissionFlagsBits.Administrator))
        return res.status(400).send({ msg: 'ADMINISTRATOR required' });
    try {
        const data = yield premium_1.default.findOne({ GuildId });
        if (!data) {
            return res.status(500).send({ error: `Can't find data` });
        }
        return res.status(200).send({
            active: data.lifeTime ? true : !isExpired(data),
            daysLeft: daysLeft(data),
            _id: data._id,
            GuildId: data.GuildId,
            __v: data.__v,
            endDate: data.endDate,
            lifeTime: data.lifeTime,
            paymentId: data.paymentId,
            startDate: data.startDate
        });
    }
    catch (err) {
        if (err)
            return res.status(500).send({ error: 'Error checking subscription status' });
    }
}));
exports.default = router;
//# sourceMappingURL=premiumStatus.js.map