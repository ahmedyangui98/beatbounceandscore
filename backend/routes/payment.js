


const express = require("express");
const {checkoutSession } = require("../controlles/paymentcontroller");


const paymentRoutes = express.Router();



paymentRoutes.post("/createcheckoutsession", checkoutSession );


module.exports = paymentRoutes;
