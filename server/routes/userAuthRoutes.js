const express = require("express");
const router = express.Router();

const controller = require("../controller/userAuthController");

//========================= Register User ===================//
router.post("/register", controller.register);

//========================= Login User ===================//
router.post("/login", controller.login);

//========================= User Profile ===================//
router.post("/logout", controller.logout);

//========================= User Profile ===================//
router.get("/profile", controller.profile);


module.exports = router;