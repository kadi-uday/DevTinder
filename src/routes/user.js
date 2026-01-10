const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

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

userRouter.get("/feed", userAuth, async (req, res) => {

    try{

        const loggedInUserId = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUserId._id},
                {toUserId: loggedInUserId._id},
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: {$nin : Array.from(hideUsersFromFeed)} },
                { _id: { $ne: loggedInUserId._id } },
            ],
        }).select(USER_SAFE_FIELDS)
        .skip(skip)
        .limit(limit);

        res.send(users);

    } catch (err) {
        res.status(400).send("error " + err.message);
    }
})

module.exports = {userRouter};