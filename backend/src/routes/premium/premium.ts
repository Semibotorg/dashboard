import { Router } from "express";
import fetch from "node-fetch";
import {
  DISCORD_API_URL,
  DISCORD_API_VERSION,
  decodeJWT,
  getUser,
  getUserGuilds,
  getBotGuilds,
  getMatualGuilds,
  RUST_API_URL,
  getGuild,
  BACKEND_API_URL,
} from "../../utils";
import { Routes, PermissionFlagsBits } from "discord-api-types/v10";
import { client } from "../../bot/index";
import paypal from "paypal-rest-sdk";
import premiumSchema from '../../models/premium'
import premiumStatusRouter from './premiumStatus'


const router = Router();

let GuildId: string;
let priceItem = 3.99;
let nameItem;
let periodTime;
let startDate: Date
let endDate: Date
let lifetime: boolean
router.post("/subscribe", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ msg: "token not found" });
  const jwtResult = decodeJWT(authorization);

   startDate = new Date();
   
   endDate = new Date(startDate);
    // data from api
    GuildId = req.body.guild_id;
    nameItem = req.body.product_name;
    periodTime = req.body.period
    lifetime = req.body.lifetime
    //checking period of time
  if (
    periodTime > 12 ||
    periodTime < 1 ||
    typeof periodTime !== "number" ||
    isNaN(periodTime) || 
    typeof lifetime !== 'boolean'
  )
    return await res
      .status(200)
      .send(
        `<script>window.opener.postMessage("error", "*"); window.close();</script>`
      );

    priceItem = periodTime * 3.99
  endDate.setMonth(endDate.getMonth() + periodTime);


  // paypal start billing
  var create_payment_json: paypal.Payment = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${BACKEND_API_URL}/return`,
      cancel_url: `${BACKEND_API_URL}/cancel`,
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

  paypal.payment.create(create_payment_json, async (error, payment: paypal.PaymentResponse) => {
    if (error) {
      console.error({ error: error });
      return await res
        .status(200)
        .send(
          `<script>window.opener.postMessage("error", "*"); window.close();</script>`
        );
    } else {
      console.log("create payment response");
      console.log(payment);
      payment.links?.forEach(async elm => {
        if(elm.rel === 'approval_url') {
            return await res.send({ link: elm.href, status: "ok" });
        }
      })
    }
  });
});

router.get("/return", async (req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId
    var execute_payment_json = {
        "payer_id": String(payerId),
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": String(priceItem)
            }
        }]
    };
    paypal.payment.execute(paymentId as any, execute_payment_json, async (error, payment) => {
        if(error){

            return await res
            .status(200)
            .send(
              `<script>window.opener.postMessage("error", "*"); window.close();</script>`
            );
        } else {
            await premiumSchema.findOneAndUpdate({
                GuildId: GuildId,
            },{
                GuildId: GuildId,
                startDate: startDate,
                endDate: endDate,
                paymentId: paymentId,
                lifeTime: lifetime
            },{
                upsert: true
            })
            return await res
            .status(200)
            .send(
              `<script>window.opener.postMessage("closed", "*"); window.close();</script>`
            );
        }

    })

  });


router.get("/cancel", async (req, res) => {
  return await res
    .status(200)
    .send(
      `<script>window.opener.postMessage("error", "*"); window.close();</script>`
    );
});

router.use('/status', premiumStatusRouter)

export default router;
