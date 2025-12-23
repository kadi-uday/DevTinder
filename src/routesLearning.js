// this only handles GET call to /user
// app.get("/user", (req, res) => {  //this req.query for reading query params
//     console.log(req.query);
//     res.send({firstName:"Kadi", lastName:"Uday"});
// });


// this req.params for getting dynamic routs ": indicates dynamic routes"
// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send({firstName:"Kadi", lastName:"Uday"});
// });


// this only handles POST call to /user
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

// const {adminAuth, userAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All Data Send...");
// });

// app.get("/admin/deleteData", (req, res) => {
//     res.send("Deleted Data...");
// });

// app.use("/user/login", (req, res) => {
//     res.send("User logged in successfully");
// });

// app.get("/user/anything", userAuth, (req, res) => {
//     res.send("user auth is verified...");
// });

// app.get("/getUserData", (req, res) => {
//     throw new Error("sdlkfj");
// })

// this should be at the last
// app.use("/", (err, req, res, next) => {
//     if(err) {
//          res.status(500).send("something went wrong!!!");
//     }
// });

//get all the users data
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         res.status(404).send("Something went wrong");
//     }
// });

// // get user data with email id
// app.get("/user", async (req, res) => {
//     try {
//         const EmailId = req.body.emailId;
//         const userEmailId = await User.find({emailId: EmailId})
//         if(userEmailId.length === 0){
//             res.status(404).send("user not found with that emailId");
//         } else {
//             res.send(userEmailId);
//         }
//     } catch (err) {
//         res.status(404).send("something went wrong while getting user emailId");
//     }
// });

// // get user data with document id
// // app.get("/user", async (req, res) => {
// //     try {
// //         const id = req.body._id;
// //         const userId = await User.findById(id);
// //         if(!userId){
// //             res.status(404).send("User not found with Id");
// //         } else {
// //             res.send(userId);
// //         }
// //     } catch (err) {
// //         res.status(404).send("something went wrong while getting user emailId");
// //     }
// // });

// // update user data with id
// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

//         if(!isUpdatedAllowed) throw new Error ("Update not allowed");
//         if(data?.skills.length > 10) throw new Error ("Skills cannot be more than 10");

//         const user = await User.findByIdAndUpdate(userId, data, {returnDocument: "before", runValidators: true});
//         console.log(user);  
//         res.send("user updated successfully");
//     }  catch (err) {        
//         res.status(404).send("something went wrong while updating!!!");
//     }
// });

// // delete user by id
// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete(userId);
//         res.send("user deleter successfully")
//     } catch (err) {
//         res.status(404).send("something went wrong while deleting the user");
//     }
// });
