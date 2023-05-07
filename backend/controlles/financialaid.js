// controllers/financialAidController.js

const financialaid = require('../model/financialaid');
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
const getFinancialAidFormById = async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await FinancialAidApplication.findById(id);
    if (applications) {
      res.json(applications);
    } else {
      res.status(404).json({ error: 'Financial aid form not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateFinancialAidForm = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, income, expenses } = req.body;
  try {
    const form = await FinancialAid.findByIdAndUpdate(
      id,
      { firstName, lastName, email, income, expenses },
      { new: true }
    );
    if (form) {
      res.json(form);
    } else {
      res.status(404).json({ error: 'Financial aid form not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a financial aid form


const deleteFinancialAidForm= async(req, res) =>{
  try
  {const deleted= await financialaid.findByIdAndDelete(req.params.id)
     
  res.status(200).send({msg:"financialaid form deleted",deleted})
  
 
  }
  catch (error) {
      res.status(500).send("couldnt delete financialaid form")
  
  }}
  
const approve = async (req, res) => {
  try {
    const approuved = await financialaid.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json(approuved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const reject = async (req, res) => {
  try {
    const rejected = await financialaid.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json(rejected);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Add other controller actions for updating, deleting, and retrieving individual applications as needed

module.exports = {
  createApplication,
  getAllApplications,
  updateFinancialAidForm,
  getFinancialAidFormById,
  deleteFinancialAidForm,
  approve,
  reject


};