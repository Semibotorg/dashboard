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
exports.getUserGuilds = exports.getUser = void 0;
const v10_1 = require("discord-api-types/v10");
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("../utils");
const cli_color_1 = __importDefault(require("cli-color"));
function getUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchuserResponse = yield (0, node_fetch_1.default)(`${utils_1.DISCORD_API_URL}/${utils_1.DISCORD_API_VERSION}${v10_1.Routes.user()}`, {
            method: "GET",
            headers: {
                Authorization: `${token.token_type} ${token.access_token}`,
            },
        }).catch((err) => {
            console.log(`${cli_color_1.default.red("[DISCORD API]")} Error`);
            console.log(err);
        });
        const userResponse = yield fetchuserResponse.json();
        return userResponse;
    });
}
exports.getUser = getUser;
function getUserGuilds(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchGuildsResponse = yield (0, node_fetch_1.default)(`${utils_1.DISCORD_API_URL}/${utils_1.DISCORD_API_VERSION}${v10_1.Routes.userGuilds()}`, {
            method: "GET",
            headers: {
                Authorization: `${token.token_type} ${token.access_token}`,
            },
        });
        const guildResponse = yield fetchGuildsResponse.json();
        return guildResponse;
    });
}
exports.getUserGuilds = getUserGuilds;
