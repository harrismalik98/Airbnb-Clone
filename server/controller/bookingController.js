const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const {BookingModel} = require("../models/bookingModel");



// ============================ ADD BOOKING ============================ //
const addBooking = async(req, res) => {
    try
    {
        const {token} = req.cookies;
        const userData = jwt.verify(token,jwtSecret);

        const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;

        const booking = await BookingModel.create({
            place, checkIn, checkOut, numberOfGuests, name, phone, price,
            user: userData.id
        });

        res.status(201).json(booking);


    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while add booking" });
    }
}





// ============================ GET BOOKINGS ============================ //
const getBookings = async(req, res) => {
    try
    {
        const {token} = req.cookies;
        const userData = jwt.verify(token,jwtSecret);

        const bookings = await BookingModel.find({user: userData.id}).populate("place");

        res.status(200).json(bookings);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while getting bookings" });
    }
}





// ============================ GET SINGLE BOOKING ============================ //
const singleBooking = async(req, res) => {
    try
    {
        const {id} = req.params;
        const booking = await BookingModel.findById({_id:id}).populate("place");
        res.status(200).json(booking);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error:  "Something went wrong while getting this booking page" })
    }
}


module.exports = {addBooking, getBookings, singleBooking};