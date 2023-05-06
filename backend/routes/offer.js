const express = require("express");
const { createOffer,getOffers,getOffersById,deleteOffer,updateOffer,createOfferReview,getJobDetails} = require("../controlles/offerController")
const offerRoutes = express.Router();


offerRoutes.post("/create",createOffer);
offerRoutes.delete("/delete/:id",deleteOffer);
offerRoutes.get("/allOffers",getOffers);
offerRoutes.put("/updateOffer/:id",updateOffer)
offerRoutes.post("/:id/reviews",createOfferReview);
offerRoutes.get("/getById/:id",getOffersById);
offerRoutes.get("/getJobDetails",getJobDetails)
module.exports = offerRoutes; 