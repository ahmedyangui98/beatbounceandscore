


const express = require("express");
const {checkoutSession, createPayment, getPaymentsByType } = require("../controlles/paymentcontroller");


const paymentRoutes = express.Router();


paymentRoutes.post("/createpayment", createPayment );

paymentRoutes.post("/createcheckoutsession", checkoutSession );


paymentRoutes.get("/getPayment/:type",getPaymentsByType);




module.exports = paymentRoutes;
