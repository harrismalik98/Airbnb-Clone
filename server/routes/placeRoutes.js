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

//========================= Get All User Places ===================//
router.get("/getUserPlaces", controller.getUserPlaces);

//========================= Getting Place Data ===================//
router.get("/places/:id", controller.getPlaceData);

//========================= Edit Place ===================//
router.put("/editplace", controller.eidtPlace);

//========================= Get All Places ===================//
router.get("/getAllPlaces", controller.getAllPlaces);

//========================= Get All Searched Places ===================//
router.get("/getSearchedPlace", controller.getSearchedPlace);

module.exports = router;