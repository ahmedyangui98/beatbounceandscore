const express = require("express");
const { EditC,Editcourses,Addcourses,Deletecourses,Findcoursesbyid,Getcourses} = require("../controlles/courses");


const courseRoutes = express.Router();

courseRoutes.post("/add", Addcourses);
courseRoutes.get("/all", Getcourses);
courseRoutes.delete("/delete/:id", Deletecourses);
courseRoutes.get("/find/:id", Findcoursesbyid);
courseRoutes.put("/edit/:id", EditC);





module.exports = courseRoutes;
