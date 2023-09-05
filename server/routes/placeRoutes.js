const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controller/placeController");

//========================= Upload By Link ===================//
router.post("/uploadByLink", controller.uploadByLink);

//========================= Upload Photo ===================//
const photosMiddleware = multer({dest:"uploads"});

router.post("/uploadPhoto", photosMiddleware.array("photos", 100) ,controller.uploadPhoto);

//========================= Add Places ===================//
// router.post("/addPlaces", controller.);

module.exports = router;