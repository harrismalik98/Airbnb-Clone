const express = require("express");
const router = express.Router();

const controller = require("../controller/bookingController");

//========================= Add Booking ===================//
router.post("/addbooking", controller.addBooking);

//========================= Get Bookings ===================//
router.get("/getBookings", controller.getBookings);

//========================= Get Single Booking ===================//
router.get("/singleBooking/:id", controller.singleBooking);

module.exports = router;