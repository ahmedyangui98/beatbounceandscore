// controllers/financialAidController.js

const FinancialAidApplication = require('../model/financialaid');

// Controller actions for CRUD operations
const createApplication = async (req, res) => {
  try {
    const application = await FinancialAidApplication.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create financial aid application' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await FinancialAidApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve financial aid applications' });
  }
};

// Add other controller actions for updating, deleting, and retrieving individual applications as needed

module.exports = {
  createApplication,
  getAllApplications,
};
