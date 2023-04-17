const express = require("express");
const { createOffer,getOffers,getOffersById,deleteOffer,updateOffer} = require("../controlles/offerController")
const offerRoutes = express.Router();


offerRoutes.post("/create",createOffer);
offerRoutes.delete("/delete/:id",deleteOffer);
offerRoutes.get("/allOffers",getOffers);
offerRoutes.put("/updateOffer/:id",updateOffer)

offerRoutes.get("/getById/:id",getOffersById);

module.exports = offerRoutes; 