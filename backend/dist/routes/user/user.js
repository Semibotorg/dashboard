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
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).send({ msg: 'token not found' });
        const jwtResult = (0, utils_1.decodeJWT)(authorization);
        const user = yield (0, utils_1.getUser)({ access_token: jwtResult.access_token, token_type: jwtResult.token_type });
        if (user) {
            return res.status(200).send(user);
        }
        else {
            return res.status(400).send({ msg: 'Error while fetching user' });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/guilds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).send({ msg: 'token not found' });
        const jwtResult = (0, utils_1.decodeJWT)(authorization);
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const userGuilds = yield (0, utils_1.getUserGuilds)({ access_token: jwtResult.access_token, token_type: jwtResult.token_type });
            const botGuilds = yield (0, utils_1.getBotGuilds)({ BotToken: process.env.BOT_TOKEN });
            const dataGuilds = yield (0, utils_1.getMatualGuilds)(userGuilds, botGuilds);
            res.status(200).send(dataGuilds);
        }), 1000);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'error occured' });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map