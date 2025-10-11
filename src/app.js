const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {

    const user = new User({
    firstName: "Kadi",
    lastName: "Bhanu",
    emailId: "kadibhanu@gmail.com",
    password: "bhanu",
    });

    try{
        await user.save();
        res.send("User Added Successfully...");
    }catch (err) {
        res.status(400),send("Error while saving the user data:" + err.message);
    }
});

connectDb()
    .then( () => {
        console.log("Database connection established...");
        app.listen(7777, () => {
        console.log("Server is successfully listening on port no. 7777");
        });
    })
    .catch( (err) => {
        console.log("Database cannot be connected!!!");
    });

