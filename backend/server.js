const express = require("express");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const app = express();
app.use(express.json());
require("dotenv").config();

connectDB();
app.use("/api/users", userRoutes);
app.listen(process.env.port, () =>
  console.log(`app is runnig on port ${process.env.port}`)
);
