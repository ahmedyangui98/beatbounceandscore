
//import questions, { answers } from '../database/data.js'
//const users = require("../model/user");
const Questions = require("../model/questionSchema");
const Results = require("../model/resultSchema");
const users = require("../model/user");





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
      /*  const q = await Questions.find({type: req.body.type});*/ 
      const quiz = await Questions.findOne({type:req.params.type})
        res.status(200).send({ msg: "quiz", quiz });

    } catch (error) {
        // res.json({ error })
        console.log(error)

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

exports.getResultByID = async (req, res) => {
    try {
        const r = await Results.find({username:req.params.id});
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

exports.getResultByIdResult = async (req, res) => {
    try {
        const result = await Results.findOne({_id:req.params.id});
        //res.json(r)
        res.status(200).send({ msg: "result", result });

    } catch (error) {
        // res.json({ error })
        console.log(error)
    }
}

/** post all result */
exports.storeResult = async (req, res) => {
   try {
        const { username, result, attempts, points, achived ,type } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');
        const user = await users.findById(req.body.username);
        Results.create({ username, result, attempts, points, achived ,type}, function(err, data){
           // console.log(data._id)
            user.result.push(data._id);
            user.save();

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

exports.Deleteresult= async(req, res) =>{
    try
    {const deleted= await Results.findByIdAndDelete(req.params.id)
       
    res.status(200).send({msg:"result deleted",deleted})
    
   
    }
    catch (error) {
        res.status(500).send("couldnt delete result")
    
    }}

    exports.Deletequestion= async(req, res) =>{
        try
        {const deleted= await Questions.findByIdAndDelete(req.params.id)
           
        res.status(200).send({msg:"QUIZ deleted",deleted})
        
       
        }
        catch (error) {
            res.status(500).send("couldnt delete QUIZ")
        
        }}    