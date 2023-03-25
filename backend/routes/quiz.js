const express = require("express");
const { getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult} = require("../controlles/quizcontroller");


const quizRoutes = express.Router();



quizRoutes.get("/questions" ,  getQuestions );
quizRoutes.post("/questions" ,  insertQuestions );
quizRoutes.delete("/questions" ,  dropQuestions );



quizRoutes.get("/result" ,  getResult );
quizRoutes.post("/result" ,  storeResult );
quizRoutes.delete("/result" ,  dropResult );
       
        


module.exports = quizRoutes;
