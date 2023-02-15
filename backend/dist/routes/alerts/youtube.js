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
const googleapis_1 = require("googleapis");
const alerts_1 = __importDefault(require("../../models/alerts"));
const bot_1 = require("../../bot");
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const youtube = googleapis_1.google.youtube({
    version: "v3",
    auth: YOUTUBE_API_KEY,
});
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const userJWT = yield (0, utils_1.decodeJWT)(authorization);
    const youtube_channel_id = req.body.channel_id;
    const guild_id = req.body.guild_id;
    const discord_channel_id = req.body.discord_channel_id;
    const message = req.body.message;
    if (!youtube_channel_id || !guild_id || !message || !discord_channel_id)
        return res.status(400).send({ msg: "bad request" });
    const guild = yield (yield bot_1.client.guilds.fetch()).find((g) => g.id == guild_id);
    if (!guild)
        return res.status(404).send({ msg: "guild not found" });
    if (!(yield (yield guild.fetch()).channels.fetch(discord_channel_id)))
        return res.status(404).send({ msg: "discord channel not found" });
    const user = yield (yield guild.fetch()).members.fetch({ user: { id: userJWT.user.id } });
    if (!user.permissions.has(discord_js_1.PermissionFlagsBits.Administrator))
        return res.status(406).send({ msg: "Administrator permission required" });
    yield youtube.channels.list({
        part: ["snippet", "statistics", "contentDetails"],
        id: [youtube_channel_id],
    }, (err, res2) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: "error occured in server" });
        }
        let res2Items = res2 === null || res2 === void 0 ? void 0 : res2.data.items;
        const channelName = (_a = res2Items[0].snippet) === null || _a === void 0 ? void 0 : _a.title;
        const channelImageUrl = (_d = (_c = (_b = res2Items[0].snippet) === null || _b === void 0 ? void 0 : _b.thumbnails) === null || _c === void 0 ? void 0 : _c.high) === null || _d === void 0 ? void 0 : _d.url;
        const channelId = res2Items[0].id;
        if (!channelId)
            return res.status(404).send({ msg: "Channel not found" });
        const dataArr = yield alerts_1.default.find({});
        dataArr.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
            var _e;
            if (data.GuildId == guild_id) {
                (_e = data.youtube) === null || _e === void 0 ? void 0 : _e.youtubeChannelName.forEach((ch) => __awaiter(void 0, void 0, void 0, function* () {
                    if (ch == channelId)
                        return res.status(403).send({ msg: "The channel already added" });
                    else {
                        yield alerts_1.default.findOneAndUpdate({
                            GuildId: guild_id,
                        }, Object.assign(Object.assign({}, data), { youtube: {
                                enabled: true,
                                youtubeChannelName: [...ch, channelId],
                                message: message,
                                channelId: discord_channel_id,
                                history: [],
                            } }), {
                            upsert: true
                        });
                        return res
                            .status(200)
                            .send({ msg: "the youtube channel has been added" });
                    }
                }));
            }
            else {
                yield alerts_1.default.findOneAndUpdate({
                    GuildId: guild_id,
                }, {
                    youtube: {
                        enabled: true,
                        youtubeChannelName: channelId,
                        message: message,
                        channelId: discord_channel_id,
                        history: [],
                    },
                }, {
                    upsert: true
                });
                return res
                    .status(200)
                    .send({ msg: "the youtube channel has been added" });
            }
        }));
    }));
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const userJWT = yield (0, utils_1.decodeJWT)(authorization);
    const guild_id = req.body.guild_id;
    if (!guild_id)
        return res.status(400).send({ msg: "bad request" });
    const guild = yield (yield bot_1.client.guilds.fetch()).find((g) => g.id == guild_id);
    if (!guild)
        return res.status(404).send({ msg: "guild not found" });
    const user = yield (yield guild.fetch()).members.fetch({ user: { id: userJWT.user.id } });
    if (!user.permissions.has(discord_js_1.PermissionFlagsBits.Administrator))
        return res.status(406).send({ msg: "Administrator permission required" });
    const dataArr = yield alerts_1.default.find({});
    dataArr.forEach(data => {
        var _a, _b;
        if (data.GuildId == guild_id) {
            if (((_b = (_a = data === null || data === void 0 ? void 0 : data.youtube) === null || _a === void 0 ? void 0 : _a.youtubeChannelName) === null || _b === void 0 ? void 0 : _b.length) == 0 || !(data === null || data === void 0 ? void 0 : data.youtube))
                return res.status(200).send({});
            else {
                return res.status(200).send(Object.assign({}, data === null || data === void 0 ? void 0 : data.youtube));
            }
        }
        else {
            return res.status(200).send({});
        }
    });
}));
router.get('/enable', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const userJWT = yield (0, utils_1.decodeJWT)(authorization);
    const guild_id = req.body.guild_id;
    if (!guild_id)
        return res.status(400).send({ msg: "bad request" });
    const guild = yield (yield bot_1.client.guilds.fetch()).find((g) => g.id == guild_id);
    if (!guild)
        return res.status(404).send({ msg: "guild not found" });
    const user = yield (yield guild.fetch()).members.fetch({ user: { id: userJWT.user.id } });
    if (!user.permissions.has(discord_js_1.PermissionFlagsBits.Administrator))
        return res.status(406).send({ msg: "Administrator permission required" });
    const dataArr = yield alerts_1.default.find({});
    dataArr.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        yield alerts_1.default.findOneAndUpdate({
            GuildId: guild_id,
        }, Object.assign(Object.assign({}, data), { youtube: Object.assign(Object.assign({}, data.youtube), { enabled: true }) }), {
            upsert: true
        });
    }));
}));
router.get('/disable', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const userJWT = yield (0, utils_1.decodeJWT)(authorization);
    const guild_id = req.body.guild_id;
    if (!guild_id)
        return res.status(400).send({ msg: "bad request" });
    const guild = yield (yield bot_1.client.guilds.fetch()).find((g) => g.id == guild_id);
    if (!guild)
        return res.status(404).send({ msg: "guild not found" });
    const user = yield (yield guild.fetch()).members.fetch({ user: { id: userJWT.user.id } });
    if (!user.permissions.has(discord_js_1.PermissionFlagsBits.Administrator))
        return res.status(406).send({ msg: "Administrator permission required" });
    const dataArr = yield alerts_1.default.find({});
    dataArr.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.GuildId == guild_id) {
            yield alerts_1.default.findOneAndUpdate({
                GuildId: guild_id,
            }, Object.assign(Object.assign({}, data), { youtube: Object.assign(Object.assign({}, data.youtube), { enabled: false }) }), {
                upsert: true
            });
        }
        else {
            return res.status(404).send({ msg: "the guild id is not in database" });
        }
    }));
}));
exports.default = router;
//# sourceMappingURL=youtube.js.map