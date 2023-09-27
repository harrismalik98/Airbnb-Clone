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
        const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
        const {token} = req.cookies;
        const userData = jwt.verify(token, jwtSecret);

        // console.log(userData);

        const placeDoc = await PlaceModel.create({
            owner: userData.id,
            title, address, photos:addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        })

        res.status(201).json(placeDoc);

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving place' });
    }
}





// ============================ GET ALL USER PLACES ============================ //
const getUserPlaces = async(req, res) => {
    try
    {
        const {token} = req.cookies;
        const {id} = jwt.verify(token, jwtSecret);
        
        const data = await PlaceModel.find({owner: id});
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting all places' });
    }
}





// ============================ GETTING PLACE DATA ============================ //
const getPlaceData = async(req, res) => {
    try
    {
        const {id} = req.params;
        const data = await PlaceModel.findById({_id:id});
        res.json(data);

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while editing place' })
    }
}





// ============================ EDIT EXISTING PLACE ============================ //
const eidtPlace = async(req, res) => {
    try
    {
        const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
        const {token} = req.cookies;
        const userData = jwt.verify(token, jwtSecret);
        // console.log(userData);

        const placeDoc = await PlaceModel.findById(id);

        if(userData.id === placeDoc.owner.toString())
        {
            await placeDoc.set({
                title, address, photos:addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests, price
            });

            await placeDoc.save();
        }

        res.status(202).json("ok");
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while editing place' })
    }
}





// ============================ GET ALL USER PLACES ============================ //
const getAllPlaces = async(req, res) => {
    try
    {
        const page = parseInt(req.query.page);
        const limit =  8;

        const skip = (page - 1) * limit;

        const places = await PlaceModel.find().skip(skip).limit(limit);
        res.status(200).json(places);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting all places' });
    }
}





// ============================ GET ALL USER PLACES ============================ //
const getSearchedPlace = async(req, res) => {
    try
    {
        const {search} = req.query;

        const regex = new RegExp(search, 'i');

        const foundPlace = await PlaceModel.find({address: { $regex: regex } });

        if(foundPlace.length > 0)
        {
            return res.status(200).json(foundPlace);
        }
        else
        {
            return res.status(404).json({ error: 'There is no place registered with this name. Kindly entered valid name' });
        }

        
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while searching place' });
    }

}

module.exports = {uploadByLink, uploadPhoto, addNewPlace, getUserPlaces, getPlaceData, eidtPlace, getAllPlaces, getSearchedPlace};