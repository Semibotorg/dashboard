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
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
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
    const data = new URLSearchParams();
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', utils_1.Auth.RedirectUrl);
    data.append('scope', utils_1.Scopes.join(' '));
    data.append('code', code);
    axios_1.default
        .post('https://discord.com/api/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        // hsaduhdsadhuuh
        .then((tokenResponse) => __awaiter(void 0, void 0, void 0, function* () {
        // const userResponse = await axios.get(
        //   'https://discord.com/api/users/@me',
        //   {
        //     headers: {
        //       Authorization: `${tokenResponse.data.token_type} ${tokenResponse.data.access_token}`,
        //     },
        //   }
        // );
        console.log(tokenResponse.data);
    })).catch(err => { console.log(err); });
    // const userResponse = await axios.get(`https://discord.com/api/users/@me`,{
    //     headers: {
    //         Authorization: `${tokenResponse.data}`,
    //       },
    // }).catch(err => console.log(err))
    // console.log(userResponse)
    // const token = jwt.sign({
    //     data: tokenResponse.data,
    //     access_token: tokenResponse.data.access_token
    // },process.env.JWT_PASSWORD as string)
}));
// http://localhost:5000/api/auth/login
exports.default = router;
//# sourceMappingURL=auth.js.map