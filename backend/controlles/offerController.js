const asyncHandler = require ('express-async-handler')
const request = require('request');
const cheerio = require('cheerio');
const offers = require('../model/offer')
const axios = require('axios');


// @description   Fetch All Products 
// @route     GET /api/products 
// @access   Public
exports.getOffers  = asyncHandler(async(req,res) => { 
const keyword = req.query.keyword ? {
  Postname:{
    $regex: req.query.keyword,
    $options: 'i'
  }
} : {}
    const offerss =  await offers.find({...keyword})
   res.json(offerss)
})

   

// @description   Fetch single Product
// @route     GET /api/products/:id
// @access   Public

exports.getOffersById = asyncHandler(async(req,res) => {

    const offer = await offers.findById(req.params.id)

    if(offer) {

        res.json(offer)
    }
    else  {
        res.status(404)
        throw new Error('Offer not found')
    }

})

exports.createOffer = asyncHandler(async(req, res) => {
    const { user, image, location, Postname, Postdescription, Companyname,rating,numReviews } = req.body;
  
    const newOffer = new offers({
      user, 
      image,
      location,
      Postname,
      Postdescription,
      Companyname,
      rating,
      numReviews
    });
  
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  });


 exports.deleteOffer =  asyncHandler(async(req, res) => {

    const offerId = req.params.id;
  
    try {
      const offer = await offers.findOneAndDelete({ _id: offerId });
  
      if (offer) {
        res.json({ message: "Offer removed" });
      } else {
        res.status(404).json({ message: "Offer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  
  })

  exports.updateOffer = asyncHandler(async (req, res) => {
    const {
      image,
      location,
      Postname,
      Postdescription,
      Companyname,
      rating,
      numReviews,
    } = req.body
  
    const offer = await offers.findById(req.params.id)
  
    if (offer) {
      offer.image = image
      offer.location = location
      offer.Postname = Postname
      offer.Postdescription = Postdescription
      offer.Companyname = Companyname
      offer.rating = rating
      offer.numReviews = numReviews
  
      const updatedOffer = await offer.save()
      res.json(updatedOffer)
    } else {
      res.status(404)
      throw new Error('Offer not found')
    }
  })
  
exports.createOfferReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const offer = await offers.findById(req.params.id)

  if (offer) {
    const offer = await offers.findById(req.params.id)
    

  

    const review = {
      rating: Number(rating),
      comment,
    }

    offer.reviews.push(review)

    offer.numReviews = offer.reviews.length

    offer.rating =
    offer.reviews.reduce((acc, item) => item.rating + acc, 0) /
    offer.reviews.length

    await offer.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Offer not found')
  }
})
  


exports.getJobDetails = (req, res) => {
  const url = 'https://www.rekrute.com/en/sport-loisirs-california-gym-emploi-recrutement-318430.html';

  axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);
      const company = $('div.col-md-9 p:first-child').text().trim().replace('Company:', '');
      const secteur = $('div.col-md-9 p:nth-child(2)').text().trim().replace('Secteur:', '');
      const description = $('div.col-md-9 div#moreinforecruteurS').text().trim();

      res.json({ company, secteur, description });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch job details' });
    });
};
