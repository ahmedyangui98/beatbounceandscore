const users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await users.findOne({ email });
    if (found) {
      return res.status(400).send({ errors: [{ msg: "user already exist" }] });
    }
    const newUser = new users(req.body);
    //bcrypt
    const salt = 10;
    const hashpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashpassword;
    //jwt
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, process.env.secretorkey);
    await newUser.save();
    res.status(200).send({ msg: "registered", newUser, token });
  } catch (error) {
    res.status(500).send("could not register");
  }
};
exports.Login = async (req, res) => {
  const { email, password, id } = req.body;
  try {
    const foundUser = await users.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "bad credentials" }] });
    }
    //jwt

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).send({ errors: [{ msg: "bad credentials" }] });
    }
    const payload = { id: foundUser._id };
    const token = jwt.sign(payload, process.env.secretorkey);
    res.status(200).send({ msg: "logging with succ", foundUser, token });
  } catch (error) {
    res.status(500).send({ msg: "couldn't logging" });
  }
};
exports.Getusers = async (req, res) => {
  try {
    const userss = await users.find();
    res.status(200).send({ msg: "list of users", userss });
  } catch (error) {
    res.status(500).send("couldn't get users");
  }
};
