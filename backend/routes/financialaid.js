// routes/financialAidRoutes.js

const express = require('express');
const financialaid = require('../controlles/financialaid');

const Router= express.Router();

// API endpoints for financial aid applications
Router.post('/financialaidapplyform', financialaid.createApplication);
Router.get('/financialaidallapplications', financialaid.getAllApplications);

Router.get('/:id', financialaid.getFinancialAidFormById);
Router.delete('/:id', financialaid.deleteFinancialAidForm);
// Add other routes for updating, deleting, and retrieving individual applications as needed

Router.put('/:id/approve', financialaid.approve);
Router.put('/:id/reject', financialaid.reject);
module.exports = Router;