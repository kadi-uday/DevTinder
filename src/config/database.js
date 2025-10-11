const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://udaykadi45:uday2004@kadi-uday-nodejs.u3lab5r.mongodb.net/devTinder");
};

module.exports = connectDb;