


const express = require("express");
const {checkoutSession, createPayment, getPaymentsByType, GetPayments } = require("../controlles/paymentcontroller");


const paymentRoutes = express.Router();


paymentRoutes.post("/createpayment", createPayment );

paymentRoutes.post("/createcheckoutsession", checkoutSession );


paymentRoutes.get("/getPayment/:type/:id",getPaymentsByType);

paymentRoutes.get("/getPayments",GetPayments);





module.exports = paymentRoutes;
