require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const adminJs = require("adminjs");

// const Products = require("./models/productsSchema");

const DefaultData = require("./defaultdata");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = 8005;

// DefaultData();

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
});

DefaultData();

// const AdminJS = require('adminjs')
// const AdminJSExpress = require('@adminjs/express')

// const PORT = 3001

// const start = async () => {
//   const app = express()

//   const admin = new AdminJS({})

//   const adminRouter = AdminJSExpress.buildRouter(admin)
//   app.use(admin.options.rootPath, adminRouter);

//   app.listen(PORT, () => {
//     console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
//   })
// }

// start();
