const express = require("express");
const { getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult, getByTypesQuestions} = require("../controlles/quizcontroller");


const quizRoutes = express.Router();



quizRoutes.get("/questions" ,  getQuestions );
quizRoutes.get("/questions/:type" ,  getByTypesQuestions );


quizRoutes.post("/questions" ,  insertQuestions );
quizRoutes.delete("/questions" ,  dropQuestions );



quizRoutes.get("/result" ,  getResult );
quizRoutes.post("/result" ,  storeResult );
quizRoutes.delete("/result" ,  dropResult );
       
        


module.exports = quizRoutes;
