const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const {User} = require("../models/userAuthModel");



// ============================ REGISTER USER METHOD ============================ //
const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        // console.log(newUser);
        res.status(201).json(newUser);

    }
    catch(error){
        res.status(422).json(error);
        // console.log(error);
    }
}





// ============================ LOGIN USER METHOD ============================ //
const login = async(req, res) => {

    try{
        const {email, password} = req.body

        const userDoc = await User.findOne({email});

        if(userDoc)
        {
            const passOk = await bcrypt.compare(password, userDoc.password);
            if(passOk)
            {
                const token = jwt.sign({id:userDoc._id, email:userDoc.email, name:userDoc.name}, jwtSecret);
                return res.cookie("token", token).json(userDoc);

                // jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err,token) => {
                //     if(err)
                //     {
                //         return res.json("Not Login Successfully")
                //     }
                //     return res.cookie("token", token).json(userDoc);
                // });
            }
            else
            {
                return res.status(401).json("Not Allowed: Wrong Credentials");
            }
        }
        else
        {
            return res.status(400).json("User not found");
        }
    }
    catch(err){
        console.log(err);
    }
}





// ============================ LOGIN USER METHOD ============================ //
const logout = async(req, res) => {
    try
    {
        res.cookie("token", "").json("true");
    }
    catch(error)
    {
        console.log(error);
    }
    
}





// ============================ PROFILE METHOD ============================ //
const profile = async(req, res) => {

    try
    {
        const {token} = req.cookies;

        if(token)
        {
            const userData = jwt.verify(token, jwtSecret);
            return res.json(userData);
        }
        else
        {
            return res.json(null);
        }
    }
    catch(error)
    {
        console.log(error);
    }

}



module.exports = {register,login, profile, logout};