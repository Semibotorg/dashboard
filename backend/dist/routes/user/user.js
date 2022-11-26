"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: 'token not found' });
    const jwtResult = (0, utils_1.decodeJWT)(authorization);
    if (!jwtResult.access_token || !jwtResult)
        return res.status(401).send({ msg: 'token is wrong' });
    res.status(200).send(jwtResult);
});
exports.default = router;
//# sourceMappingURL=user.js.map