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

        const emailFound = await User.findOne({email:email});

        if(emailFound)
        {
            return res.status(409).json({error: "Email already in use. Please use a different email to register."});
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password:hashedPassword
            });

            // console.log(newUser);
            res.status(201).json(newUser);
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
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
                return res.status(200).cookie("token", token, { maxAge:2592000000, httpOnly:true, secure:true, sameSite:'None' }).json(userDoc);

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
                return res.status(401).json({error: "Incorrect password. Please check your password and try again."});
            }
        }
        else
        {
            return res.status(400).json({error:"Invalid email address. Please enter a valid email address."});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}





// ============================ LOGOUT METHOD ============================ //
const logout = async(req, res) => {
    try
    {
        return res.status(200).clearCookie("token").json({message:"Logout Successful"});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
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
        return res.status(500).json({error: "Internal Server Error"});
    }
}



module.exports = {register,login, profile, logout};