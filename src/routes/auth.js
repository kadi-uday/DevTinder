const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {

    try{
        //validation of the data
        validateSignUpData(req);

        // encrypt the password
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash =  await bcrypt.hash(password, 10);

        // creating a new instance of a User model
        const user = new User( {
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save();
        res.send("User Added Successfully...");
    }catch (err) {
        res.status(400),send("ERROR:" + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid credentials!!!");
        }
        
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            //creating a jwt token
            const token = await user.getJWT();

            //add token to cookie and send response back to the user
            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
            res.send(user);
        } else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("Logged out successfully");
});

module.exports = {authRouter};