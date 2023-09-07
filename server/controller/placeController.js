const express = require("express");
const imageDownloader = require('image-downloader');
const fs = require("fs");
const app = express();
const path = require("path");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

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





// ============================ UPLOAD PHOTO ============================ //
const uploadPhoto = async(req, res) => {
    try
    {
        const uploadedFiles = [];
        console.log(req.files);
        for(let i=0; i<req.files.length; i++)
        {
            const {path, originalname} = req.files[i];

            const extension = originalname.split(".");
            const ext = extension[extension.length-1];

            const newPath = path + "." + ext;
            fs.renameSync(path, newPath);

            uploadedFiles.push(newPath.replace("uploads\\", ""));
        }

        res.status(200).json(uploadedFiles);

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file upload' });
    }
};





// ============================ ADD NEW PLACE ============================ //
const addNewPlace = async(req, res) => {
    try
    {
        const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body;
        const {token} = req.cookies;
        const userData = jwt.verify(token, jwtSecret);

        // console.log(userData);

        const placeDoc = await PlaceModel.create({
            owner: userData.id,
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests
        })

        res.status(201).json(placeDoc);

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file upload' });
    }
}


module.exports = {uploadByLink, uploadPhoto, addNewPlace};