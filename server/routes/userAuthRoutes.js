const express = require("express");
const router = express.Router();

const controller = require("../controller/userAuthController");

//========================= Register User ===================//
router.post("/register", controller.registerUser);

//========================= Login User ===================//
router.post("/login", controller.loginUser);

//========================= User Profile ===================//
router.get("/profile", controller.userProfile);


module.exports = router;