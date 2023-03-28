import express from "express";
import axios from "axios";
import paytmChecksum from "paytmchecksum";

const paytmRouter = express.Router();

let paytmParams = {};
const PAYTM_REQ_TYPE = "Payment";
const MERCHANT_KEY = "something";
const MERCHANT_ID = "something";
const MERCHANT_WEB_NAME = "Something";
const CALLBACK_URL = "something";
const AUTH_TOKEN = "HEXADECIMAL_NUMBER";


paytmRouter.use("*", (req, res, next) => {
  const { authToken } = req.body;
  const forbiddenResponse = { message: "Not Authorized" };
  if (authToken !== AUTH_TOKEN) res.status(403).send(JSON.stringify(forbiddenResponse));
  else next();
})

paytmRouter.post("/initiatePayment", (req, res) => {
  const { orderId, amount, userId } = req.body;
  paytmParams.body = {
    "requestType": PAYTM_REQ_TYPE,
    "mid": MERCHANT_ID,
    "websiteName": MERCHANT_WEB_NAME,
    "orderId": +orderId,
    "callbackUrl": CALLBACK_URL,
    "txnAmount": {
      "value": +amount,
      "currency": "INR",
    },
    "userInfo": {
      "custId": +userId,
    },
  };
  paytmChecksum
    .generateSignature(JSON.stringify(paytmParams.body), MERCHANT_KEY)
    .then((checksum) => {
      paytmParams.head = {
        "signature": checksum
      };
      const postData = JSON.stringify(paytmParams);
      const options = {
        baseURL: process.env.BUILD_ENV === "production"
          ? 'securegw.paytm.in'
          : 'securegw-stage.paytm.in',
        port: 443,
        url: `/theia/api/v1/initiateTransaction?mid=${+MERCHANT_ID}&orderId=${+orderId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        },
        data: postData,
      };
      axios({
        ...options,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          res.status(500).send({
            error: error.toString(),
          });
        })
        .finally(() => {
          //
        });
    })
    .catch((error) => {
      res.status(500).send(JSON.stringify({
        message: "INTERNAL SERVER ERROR",
        stack: error.toString(),
      }));
    });
});

paytmRouter.post("/checkStatus", (req, res) => {
  const { orderId } = req.body;
  paytmParams.body = {
    /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
    "mid": +MERCHANT_ID,
    /* Enter your order id which needs to be check status for */
    "orderId": +orderId,
  };
  paytmChecksum.generateSignature(JSON.stringify(paytmParams.body), +MERCHANT_KEY)
    .then((checksum) => {
      paytmParams.head = {
        /* put generated checksum value here */
        "signature": checksum
      };
      const postData = JSON.stringify(paytmParams);
      const options = {
        baseURL: process.env.BUILD_ENV === "production"
          ? 'securegw.paytm.in'
          : 'securegw-stage.paytm.in',
        port: 443,
        url: '/v3/order/status',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        },
        data: postData,
      };
      axios({
        ...options,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          res.status(500).send({
            error: error.toString(),
          });
        })
        .finally(() => {
          //
        });
    })
    .catch((error) => {
      res.status(500).send(JSON.stringify({
        message: "INTERNAL SERVER ERROR",
        stack: error.toString(),
      }));
    });
});

export default paytmRouter;