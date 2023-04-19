// routes/financialAidRoutes.js

const express = require('express');
const financialaid = require('../controlles/Financialaid');

const Router= express.Router();

// API endpoints for financial aid applications
Router.post('/financialaidapplyform', financialaid.createApplication);
Router.get('/financialaidallapplications', financialaid.getAllApplications);
// Add other routes for updating, deleting, and retrieving individual applications as needed

module.exports = Router;
