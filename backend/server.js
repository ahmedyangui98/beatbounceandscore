const express = require("express");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const paymentRoutes = require("./routes/payment");
const AdminFaceIdRoutes = require("./routes/adminFaceId");

const offerRoutes = require("./routes/offer");
const uploadRoutes = require("./routes/uploadRoutes")
const path = require("path")





const courseRoutes = require("./routes/courses");
const chapterRoutes = require("./routes/chapter");

const financialAidRoutes = require('./routes/financialaid');


const app = express();
const cors = require('cors');
app.use(express.json({ limit: '50mb' }));
require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.static('public'));


connectDB();
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/users", userRoutes, quizRoutes, paymentRoutes);
app.use("/api/", AdminFaceIdRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/financialaid', financialAidRoutes);


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.listen(process.env.port, () =>
  console.log(`app is runnig on port ${process.env.port}`)
);
