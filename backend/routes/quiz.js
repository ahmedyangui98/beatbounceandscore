const express = require("express");
const { getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult, getByTypesQuestions, getResultByID, getResultByIdResult, Deleteresult, Deletequestion} = require("../controlles/quizcontroller");


const quizRoutes = express.Router();



quizRoutes.get("/questions" ,  getQuestions );
quizRoutes.get("/questions/:type" ,  getByTypesQuestions );


quizRoutes.post("/questions" ,  insertQuestions );
quizRoutes.delete("/questions" ,  dropQuestions );
quizRoutes.delete("/questions/:id" ,  Deletequestion );




quizRoutes.get("/result" ,  getResult );
quizRoutes.get("/result/:id" ,  getResultByID );
quizRoutes.get("/result/try/:id" ,  getResultByIdResult );

quizRoutes.post("/result" ,  storeResult );
quizRoutes.delete("/result" ,  dropResult );
quizRoutes.delete("/result/:id" ,  Deleteresult );

       
        


module.exports = quizRoutes;
