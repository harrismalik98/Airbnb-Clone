const express = require("express");
const router = express.Router();

const controller = require("../controller/placeController");

//========================= Upload By Link ===================//
router.post("/uploadByLink", controller.uploadByLink);

//========================= Add Places ===================//
// router.post("/addPlaces", controller.);

module.exports = router;