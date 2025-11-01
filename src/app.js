const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

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
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            res.send("login successful");
        } else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

//get all the users data
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});

// get user data with email id
app.get("/user", async (req, res) => {
    try {
        const EmailId = req.body.emailId;
        const userEmailId = await User.find({emailId: EmailId})
        if(userEmailId.length === 0){
            res.status(404).send("user not found with that emailId");
        } else {
            res.send(userEmailId);
        }
    } catch (err) {
        res.status(404).send("something went wrong while getting user emailId");
    }
});

// get user data with document id
// app.get("/user", async (req, res) => {
//     try {
//         const id = req.body._id;
//         const userId = await User.findById(id);
//         if(!userId){
//             res.status(404).send("User not found with Id");
//         } else {
//             res.send(userId);
//         }
//     } catch (err) {
//         res.status(404).send("something went wrong while getting user emailId");
//     }
// });

// update user data with id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isUpdatedAllowed) throw new Error ("Update not allowed");
        if(data?.skills.length > 10) throw new Error ("Skills cannot be more than 10");

        const user = await User.findByIdAndUpdate(userId, data, {returnDocument: "before", runValidators: true});
        console.log(user);  
        res.send("user updated successfully");
    }  catch (err) {        
        res.status(404).send("something went wrong while updating!!!");
    }
});

// delete user by id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleter successfully")
    } catch (err) {
        res.status(404).send("something went wrong while deleting the user");
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

