


const express = require("express");
const {checkoutSession, createPayment } = require("../controlles/paymentcontroller");


const paymentRoutes = express.Router();


paymentRoutes.post("/createpayment", createPayment );

paymentRoutes.post("/createcheckoutsession", checkoutSession );


module.exports = paymentRoutes;
