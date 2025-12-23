const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());

app.use(cookieParser());

//push the user data
app.post("/signup", async (req, res) => {

    try{
        //validation of the data
        validateSignUpData(req);

        // encrypt the password
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash =  await bcrypt.hash(password, 10);
        console.log(passwordHash);

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

app.post("/login", async (req, res) => {
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
            res.send("login successful");
        } else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

app.post("/sendConnectRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " Send the connection request");
    }
);


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

