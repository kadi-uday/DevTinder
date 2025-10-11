const express = require("express");

const app = express();

//this only handles GET call to /user
// app.get("/user", (req, res) => {  //this req.query for reading query params
//     console.log(req.query);
//     res.send({firstName:"Kadi", lastName:"Uday"});
// });


//this req.params for getting dynamic routs ": indicates dynamic routes"
// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send({firstName:"Kadi", lastName:"Uday"});
// });


//this only handles POST call to /user
// app.post("/user", (req, res) => {
//     //sending data to db
//     res.send("data successfully saved in the DB");
// });

// //this only handles DELETE call to /user
// app.delete("/user", (req, res) => {
//     res.send("deleted successfully");
// });

// app.use("/test", (req, res) =>{
//     res.send("Testing route!!!");
// });

// app.get(/.+fly$/, (req, res) => {
//     res.send("playing with routes");
// });


// app.use("/user", 
//     (req, res, next) =>{
//     console.log("Handling Routes ");
//     // res.send("Response ");
//     next();
// },[
// (req, res, next) =>{
//     console.log("Handling Routes 2 ");
//     // res.send("Response 2");
//     next();
// },
// (req, res, next) =>{
//     console.log("Handling Routes 3");
//     // res.send("Response 3");
//     next();
// },
// (req, res, next) =>{
//     console.log("Handling Routes 4");
//     // res.send("Response 45");
//     next();
// }],
// (req, res, next) =>{
//     console.log("Handling Routes 5");
//     // res.send("response 5(i)");
//     res.send("Response 5");
//     // next();
// }
// );


// Handling Auth Middleware for all DET, POST,... requests

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Send...");
});

app.get("/admin/deleteData", (req, res) => {
    res.send("Deleted Data...");
});

app.use("/user/login", (req, res) => {
    res.send("User logged in successfully");
});

app.get("/user/anything", userAuth, (req, res) => {
    res.send("user auth is verified...");
});

app.get("/getUserData", (req, res) => {
    throw new Error("sdlkfj");
})

//this should be at the last
app.use("/", (err, req, res, next) => {
    if(err) {
         res.status(500).send("something went wrong!!!");
    }
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port no. 7777");
});
