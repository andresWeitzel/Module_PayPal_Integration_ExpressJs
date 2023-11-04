//External
import { Request } from "express";
import "dotenv/config";
//Helpers
import { sendPostRequest } from "../../helpers/axios/request/post";
//Const
//paypal base
const API_PAYPAL_BASE_URL: string = process.env.API_PAYPAL_BASE_URL || "";
//paypal confirm order
const API_PAYPAL_ORDERS_BASE_URL: string =
  process.env.API_PAYPAL_ORDERS_BASE_URL || "";
const API_PAYPAL_AUTHORIZE_PAYMENT_ORDER_RESOURCE: string =
  process.env.API_PAYPAL_AUTHORIZE_PAYMENT_ORDER_RESOURCE || "";
//vars
let reqBody: any;
let reqHeaders: any;
let reqParams: any;
let axiosData: any;
let axiosConfig: any;
let orderCreated: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios post request for authorize a payment for an order from paypal api
 * @param {any} req any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const authorizePaymentFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqBody = req.body;
    reqParams = req.params;
    orderCreated = null;

    const API_PAYPAL_AUTHORIZE_PAYMENT_URL: string =
      `${API_PAYPAL_BASE_URL}${API_PAYPAL_ORDERS_BASE_URL}${reqParams.id}${API_PAYPAL_AUTHORIZE_PAYMENT_ORDER_RESOURCE}` ||
      "";

    console.log(API_PAYPAL_AUTHORIZE_PAYMENT_URL);

    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        //"PayPal-Request-Id": reqHeaders?.paypalRequestId,
        Authorization: reqHeaders?.authorization,
      },
    };

    orderCreated = await sendPostRequest(
      API_PAYPAL_AUTHORIZE_PAYMENT_URL,
      null,
      axiosConfig
    );

    return orderCreated;
  } catch (error) {
    msgResponse = "ERROR in authorizePaymentFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};