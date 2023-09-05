const express = require("express");
const imageDownloader = require('image-downloader');
const fs = require("fs");
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



module.exports = {uploadByLink, uploadPhoto};