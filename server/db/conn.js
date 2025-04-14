const mongoose = require("mongoose");

// The database connection link is in env file & called in the DB variable
// This is done so for securing the code
// Because if our code is exploited the database connection link is in another secure .env file
const DB = "mongodb+srv://vanshmomaya9:Vansh1811@cluster0.ziaclnc.mongodb.net/ecommerce-agrishop?retryWrites=true";

// Connecting mongoDB with nodeJS
mongoose.connect(DB).then(()=>console.log("Database connected")).catch((error)=>console.log("error" + error.messagge));

