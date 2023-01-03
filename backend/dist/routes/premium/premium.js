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
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const premium_1 = __importDefault(require("../../models/premium"));
const premiumStatus_1 = __importDefault(require("./premiumStatus"));
const router = (0, express_1.Router)();
let GuildId;
let priceItem = 3.99;
let nameItem;
let periodTime;
let startDate;
let endDate;
let lifetime;
router.post("/subscribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send({ msg: "token not found" });
    const jwtResult = (0, utils_1.decodeJWT)(authorization);
    startDate = new Date();
    endDate = new Date(startDate);
    // data from api
    GuildId = req.body.guild_id;
    nameItem = req.body.product_name;
    periodTime = req.body.period;
    lifetime = req.body.lifetime;
    //checking period of time
    if (periodTime > 12 ||
        periodTime < 1 ||
        typeof periodTime !== "number" ||
        isNaN(periodTime) ||
        typeof lifetime !== 'boolean')
        return yield res
            .status(200)
            .send(`<script>window.opener.postMessage("error", "*"); window.close();</script>`);
    priceItem = periodTime * 3.99;
    endDate.setMonth(endDate.getMonth() + periodTime);
    // paypal start billing
    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `${utils_1.BACKEND_API_URL}/return`,
            cancel_url: `${utils_1.BACKEND_API_URL}/cancel`,
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: nameItem,
                            sku: "001",
                            price: `${priceItem}`,
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: `${priceItem}`,
                },
                description: "Semibot Premium.",
            },
        ],
    };
    paypal_rest_sdk_1.default.payment.create(create_payment_json, (error, payment) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (error) {
            console.error({ error: error });
            return yield res
                .status(200)
                .send(`<script>window.opener.postMessage("error", "*"); window.close();</script>`);
        }
        else {
            console.log("create payment response");
            console.log(payment);
            (_a = payment.links) === null || _a === void 0 ? void 0 : _a.forEach((elm) => __awaiter(void 0, void 0, void 0, function* () {
                if (elm.rel === 'approval_url') {
                    return yield res.send({ link: elm.href, status: "ok" });
                }
            }));
        }
    }));
}));
router.get("/return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": String(payerId),
        "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": String(priceItem)
                }
            }]
    };
    paypal_rest_sdk_1.default.payment.execute(paymentId, execute_payment_json, (error, payment) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return yield res
                .status(200)
                .send(`<script>window.opener.postMessage("error", "*"); window.close();</script>`);
        }
        else {
            yield premium_1.default.findOneAndUpdate({
                GuildId: GuildId,
            }, {
                GuildId: GuildId,
                startDate: startDate,
                endDate: endDate,
                paymentId: paymentId,
                lifeTime: lifetime
            }, {
                upsert: true
            });
            return yield res
                .status(200)
                .send(`<script>window.opener.postMessage("closed", "*"); window.close();</script>`);
        }
    }));
}));
router.get("/cancel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield res
        .status(200)
        .send(`<script>window.opener.postMessage("error", "*"); window.close();</script>`);
}));
router.use('/status', premiumStatus_1.default);
exports.default = router;
//# sourceMappingURL=premium.js.map