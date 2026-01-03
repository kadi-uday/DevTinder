const express = require("express");
const requestRouter = express.Router();


const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " Send the connection request");
    }
);

module.exports = {requestRouter};