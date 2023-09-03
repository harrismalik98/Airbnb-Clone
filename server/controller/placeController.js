const express = require("express");
const imageDownloader = require('image-downloader');
const app = express();
const path = require("path");

const {PlaceModel} = require("../models/placeModel");



// ============================ UPLOAD BY LINK ============================ //
const uploadByLink = async(req, res) => {
    try
    {
        const {link} = req.body;

        const uploadsFolder = path.join(__dirname, '..', 'uploads/');
        // console.log(uploadsFolder);

        const newName = Date.now()+".jpg";

        options = {
            url: link,
            dest: uploadsFolder + newName,     // will be saved to uploads folder
          };
          
        await imageDownloader.image(options);
        
        return res.json(newName);
    }
    catch(error)
    {
        console.error(error);
    }
};



module.exports = {uploadByLink};