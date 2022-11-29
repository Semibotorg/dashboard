"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../bot/index");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const stats = {
        serverCount: index_1.client.guilds.cache.size,
        usersCount: index_1.client.users.cache.size
    };
    res.status(200).send({ stats });
});
exports.default = router;
//# sourceMappingURL=stats.js.map