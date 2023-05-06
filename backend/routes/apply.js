const express = require("express");
const {createApply} = require("../controlles/ApplyController")

const applyRoutes = express.Router();

applyRoutes.post("/apply", createApply);
