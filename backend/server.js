const express = require("express");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const app = express();
const cors = require('cors');
app.use(express.json());
require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:3000'
}));
connectDB();
app.use("/api/users", userRoutes);
app.listen(process.env.port, () =>
  console.log(`app is runnig on port ${process.env.port}`)
);
