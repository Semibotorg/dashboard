"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reddit_1 = __importDefault(require("./reddit"));
const twitch_1 = __importDefault(require("./twitch"));
const youtube_1 = __importDefault(require("./youtube"));
const twitter_1 = __importDefault(require("./twitter"));
const router = (0, express_1.Router)();
router.use('/twitch', twitch_1.default);
router.use('/twitter', twitter_1.default);
router.use('/reddit', reddit_1.default);
router.use('/youtube', youtube_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map