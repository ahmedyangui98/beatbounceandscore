const express = require("express");
const { Register, Login, Getusers,Deleteuser,EditUser,EditU, Finduserbyid, verifyEmail} = require("../controlles/user");const { IsAuth } = require("../middlewear/isAuth");
const { registervalidation,
  Validation,
  loginvalidation,
  validateDate,
} = require("../middlewear/validation");

const userRoutes = express.Router();

userRoutes.post("/register" ,  validateDate,registervalidation, Validation, Register);
userRoutes.post("/login", loginvalidation, Validation, Login);
userRoutes.post("/verifyemail",verifyEmail);
userRoutes.get("/current", IsAuth, (req, res) => {
  res.send({ user: req.user });
});
userRoutes.get("/all", Getusers);
userRoutes.delete("/delete/:id", Deleteuser);
userRoutes.put("/edit/:id", EditUser);
userRoutes.get("/find/:id", Finduserbyid);
userRoutes.put("/editu/:id", EditU);

module.exports = userRoutes;
