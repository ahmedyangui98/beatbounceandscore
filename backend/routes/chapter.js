const express = require("express");
const { EditCh,Editchapters,Addchapters,Getchapters,Findchaptersbyid,Deletechapters} = require("../controlles/chapter");


const chapterRoutes = express.Router();

chapterRoutes.post("/add", Addchapters);
chapterRoutes.get("/all", Getchapters);
chapterRoutes.delete("/delete/:id", Deletechapters);
chapterRoutes.get("/find/:id", Findchaptersbyid);
chapterRoutes.put("/edit/:id", EditCh);





module.exports = chapterRoutes;