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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const v10_1 = require("discord-api-types/v10");
const index_1 = require("../../bot/index");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).send({ msg: 'token not found' });
        const jwtResult = (0, utils_1.decodeJWT)(authorization);
        const userGuilds = yield (0, utils_1.getUserGuilds)({ access_token: jwtResult.access_token, token_type: jwtResult.token_type });
        const botGuilds = yield (0, utils_1.getBotGuilds)({ BotToken: process.env.BOT_TOKEN });
        const dataGuilds = yield (0, utils_1.getMatualGuilds)(userGuilds, botGuilds);
        res.status(200).send(dataGuilds);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'error occured' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: 'token not found' });
    const jwtResult = (0, utils_1.decodeJWT)(authorization);
    const guild = index_1.client.guilds.cache.get(params.id);
    if (!guild)
        return res.status(400).send({ msg: 'guild not found' });
    const guildResponse = yield (0, utils_1.getGuild)({ access_token: jwtResult.access_token, token_type: jwtResult.token_type, guildId: params.id });
    const member = yield guild.members.fetch({ user: jwtResult.user.id });
    if (!member)
        return res.status(400).send({ msg: 'member not found' });
    if (!member.permissions.has(v10_1.PermissionFlagsBits.Administrator))
        return res.status(400).send({ msg: 'ADMINISTRATOR required' });
    res.status(200).send(guildResponse);
}));
exports.default = router;
//# sourceMappingURL=guilds.js.map