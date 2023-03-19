const express = require("express");
const { Register, Login, Getusers,Deleteuser,EditUser,EditU, Finduserbyid, verifyEmail,countByGender,countByRole, sendPasswordLink, ForgotPassword,ChangePasswordWithIdandToken} = require("../controlles/user");const { IsAuth } = require("../middlewear/isAuth");
const { registervalidation,
  Validation,
  loginvalidation,
  validateDate,
} = require("../middlewear/validation");

const userRoutes = express.Router();

userRoutes.post("/register" ,  validateDate,registervalidation, Validation, Register);
userRoutes.post("/login", loginvalidation, Validation, Login);
userRoutes.get("/current", IsAuth, (req, res) => {
  res.send({ user: req.user });
});
userRoutes.get("/all", Getusers);
userRoutes.delete("/delete/:id", Deleteuser);
userRoutes.put("/edit/:id", validateDate,registervalidation, Validation,EditUser);
userRoutes.get("/find/:id", Finduserbyid);
userRoutes.put("/editu/:id", EditU);
userRoutes.get("/countbygender",countByGender);
userRoutes.get("/countByRole",countByRole);


userRoutes.post("/sendpasswordlink",sendPasswordLink);
userRoutes.get("/forgotpassword/:id/:token",ForgotPassword);
userRoutes.post("/changepassword/:id/:token",ChangePasswordWithIdandToken);



module.exports = userRoutes;
