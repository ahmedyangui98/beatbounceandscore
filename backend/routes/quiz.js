const express = require("express");
const { getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult, getByTypesQuestions, getResultByID, getResultByIdResult} = require("../controlles/quizcontroller");


const quizRoutes = express.Router();



quizRoutes.get("/questions" ,  getQuestions );
quizRoutes.get("/questions/:type" ,  getByTypesQuestions );


quizRoutes.post("/questions" ,  insertQuestions );
quizRoutes.delete("/questions" ,  dropQuestions );



quizRoutes.get("/result" ,  getResult );
quizRoutes.get("/result/:id" ,  getResultByID );
quizRoutes.get("/result/try/:id" ,  getResultByIdResult );

quizRoutes.post("/result" ,  storeResult );
quizRoutes.delete("/result" ,  dropResult );
       
        


module.exports = quizRoutes;