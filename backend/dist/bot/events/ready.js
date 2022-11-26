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
const discord_js_1 = require("discord.js");
const cli_color_1 = __importDefault(require("cli-color"));
const util_1 = require("util");
const wait = (0, util_1.promisify)(setTimeout);
module.exports = {
    name: "ready",
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield client.guilds.fetch()).forEach((guild) => __awaiter(this, void 0, void 0, function* () {
                const firstInvites = yield (yield guild.fetch()).invites;
                client.invites.set(guild.id, new discord_js_1.Collection((yield firstInvites.fetch()).map((invite) => [
                    invite.code,
                    invite.uses,
                ])));
            }));
            console.log(`${cli_color_1.default.green(`[DISCORD BOT]`)} Ready`);
        });
    },
};
