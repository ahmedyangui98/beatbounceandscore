
const express = require("express");
const {ImageGetFromUrl,Login2,Logout2,Register2,ImageGetProfilePic } = require("../controlles/adminFaceIdController");


const AdminFaceIdRoutes = express.Router();


AdminFaceIdRoutes.post("/auth/register", Register2 );
AdminFaceIdRoutes.post("/auth/login", Login2 );
AdminFaceIdRoutes.post("/auth/logout", Logout2 );
AdminFaceIdRoutes.post("/image/get/from/url", ImageGetFromUrl );
AdminFaceIdRoutes.post("/image/get/profile/pic", ImageGetProfilePic );





module.exports = AdminFaceIdRoutes;