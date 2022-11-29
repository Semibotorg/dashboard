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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const v10_1 = require("discord-api-types/v10");
const router = (0, express_1.Router)();
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(utils_1.Auth.Url);
}));
router.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const error = req.query.error;
    if (error)
        return res.status(200).send(`<script>window.close();</script>`);
    if (!code)
        return res.status(400).send({ msg: 'wrong code' });
    try {
        const data = new URLSearchParams();
        data.append('client_id', process.env.CLIENT_ID);
        data.append('client_secret', process.env.CLIENT_SECRET);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', utils_1.Auth.RedirectUrl);
        data.append('scope', utils_1.Scopes.join(' '));
        data.append('code', code);
        const tokenWait = yield (0, node_fetch_1.default)(`${utils_1.DISCORD_API_URL}/${utils_1.DISCORD_API_VERSION}${v10_1.Routes.oauth2TokenExchange()}`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const tokenResponse = yield tokenWait.json();
        const userResponse = yield (0, utils_1.getUser)({ access_token: tokenResponse.access_token, token_type: tokenResponse.token_type });
        const token = jsonwebtoken_1.default.sign({
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            user: userResponse,
            token_type: tokenResponse.token_type
        }, process.env.JWT_PASSWORD);
        res
            .status(200)
            .send(`<script>window.opener.postMessage("${token} login", "*"); window.close(); </script>`);
    }
    catch (err) {
        console.log(err);
    }
}));
// http://localhost:5000/api/auth/login
exports.default = router;
//# sourceMappingURL=auth.js.map