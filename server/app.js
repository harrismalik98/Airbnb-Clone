const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGODB_URL);



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname+"/uploads")); // For getting images that are downloaded by link

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));


const userAuthRoutes = require("./routes/userAuthRoutes");
const placeRoutes = require("./routes/placeRoutes");

app.use("/", userAuthRoutes);
app.use("/", placeRoutes);



app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});
