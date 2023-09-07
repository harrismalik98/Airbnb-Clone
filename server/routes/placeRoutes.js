const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controller/placeController");

//========================= Upload By Link ===================//
router.post("/uploadByLink", controller.uploadByLink);

//========================= Upload Photo ===================//
const photosMiddleware = multer({dest:"uploads"});

router.post("/uploadPhoto", photosMiddleware.array("photos", 100) ,controller.uploadPhoto);

//========================= Add New Place ===================//
router.post("/addNewPlace", controller.addNewPlace);

module.exports = router;