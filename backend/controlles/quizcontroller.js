
//import questions, { answers } from '../database/data.js'
//const users = require("../model/user");
const Questions = require("../model/questionSchema");
const Results = require("../model/resultSchema");




/** get all questions */
exports.getQuestions = async (req, res) => {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}
exports.getByTypesQuestions = async (req, res) => {
    try {
        console.log(req.params.type)
      /*  const q = await Questions.find({type: req.body.type});*/ 
      const q = await Questions.find({type:req.params.type})

        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
exports.insertQuestions = async (req, res) =>{
    const {questions,answers} = req.body;
    try {
        Questions.insertMany(req.body , function(err, data){
            res.json({ msg: "Data Saved Successfully...!",data})
        })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
exports.dropQuestions = async (req, res) =>{
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
exports.getResult = async (req, res) => {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
exports.storeResult = async (req, res) => {
   try {
        const { username, result, attempts, points, achived ,type } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');

        Results.create({ username, result, attempts, points, achived ,type}, function(err, data){
            res.json({ msg : "Result Saved Successfully...!"})
        })

   } catch (error) {
        res.json({error})
   }
}

/** delete all result */
exports.dropResult = async (req, res) => {
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}