"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/auth"));
const user_1 = __importDefault(require("./user/user"));
const stats_1 = __importDefault(require("./stats/stats"));
const premium_1 = __importDefault(require("./premium/premium"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/auth', auth_1.default);
router.use('/stats', stats_1.default);
router.use('/premium', premium_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map