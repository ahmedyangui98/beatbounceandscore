const { body, validationResult } = require("express-validator");

exports.registervalidation = [
  body("email", "please add a valid email").isEmail(),
  body("password", "at least 6 caractes").isLength({ min: 6 }),
];
exports.loginvalidation = [
  body("email", "please add a valid email").isEmail(),
  body("password", "at least 6 caractes").isLength({ min: 6 }),
];
exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
