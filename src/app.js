const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("hello hello hello");
});

app.use("/test", (req, res) =>{
    res.send("Testing route!!!");
})

app.use("/", (req, res) => {
    res.send("Hello world from the server!!");
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port no. 7777");
});
