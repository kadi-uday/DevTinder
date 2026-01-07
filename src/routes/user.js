const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_FIELDS = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{

        const loggedInUserId = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_FIELDS);

        res.json({
            message: "Connection Requests fetched successfully",
            data: connectionRequests,
        });
    }catch (err) {
        res.status(400).send("Error" + err.message);
    }

});

userRouter.get("/user/connections", userAuth, async (req, res) => {

    try{

        const loggedInUserId = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId._id, status: "accepted" },
                { toUserId: loggedInUserId._id,  status: "accepted" },
            ],
        }).populate("fromUserId", USER_SAFE_FIELDS).populate("toUserId", USER_SAFE_FIELDS);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUserId._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            message: "Connections fetched successfully",
            data: data,
        });
    }catch (err) {
        res.status(400).send("Error" + err.message);
    }
});

module.exports = {userRouter};