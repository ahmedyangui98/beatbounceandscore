const { body, validationResult } = require("express-validator");
const VarIsBanned = "true";
exports.registervalidation = [
  body("firstname", "firstname at least 3 caractes").isLength({ min: 3 }),
  body("lastname", "lastname at least 3 caractes").isLength({ min: 3 }),
  body("email", "please add a valid email").isEmail(),
  body("password", "at least 6 caractes").isLength({ min: 6 }),
  body("gender", "please select your gender").not().isEmpty(),
  body("image", "please select an image").not().isEmpty(),  
];
exports.loginvalidation = [
  body("email", "please add a valid email").isEmail(),
  body("password", "password doesn't match").isLength({ min: 6 }),
  //body("isBanned", "Cannot login ,Your account is banned").equals("true"),

];
exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


exports.validateDate = (req, res, next) => {
  const { birthdate } = req.body;
  const currentDate = new Date();
  const inputDate = new Date(birthdate);
  const threeYearsOld = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
  if (inputDate > currentDate || inputDate > threeYearsOld) {
    return res.status(422).json({ errors: [{ msg: 'please add a valid birthdate (over 5 years old)' }] });
  }
  next();
}
