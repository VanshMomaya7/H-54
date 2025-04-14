const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// Get Products API
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console the data" + productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error", error.message);
  }
});

// GET individual data according to their Ids
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // We will get the product id , based on that we will get that particular data
    const individualdata = await Products.findOne({ id: id });

    // console.log(individualdata + "Individual Data");

    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error", error.message);
  }
});

// Register Data

router.post("/register", async (req, res) => {
  // console.log(req.body);
  // const fname = request.body.fname

  const { fname, email, mobile, password, cpassword } = req.body;

  // Checking if user fills all the data
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "Fill in the data" });

    console.log("No Data Available");
  }

  // Checking if data is already stored
  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This user already Present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password & CPassword Did not Match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // vansh -> encrypt vujug ->> decrypt -> vansh
      // bcryptjs

      // Password Hashing Process

      // Save is mongoDB method
      const storedata = await finalUser.save();
      console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// Login User API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Fill all Data" });
  }

  // First email is from the database & second one is the one that user entered
  try {
    const userLogin = await USER.findOne({ email: email });
    // console.log(userLogin);

    // First password is from input field which user provided
    // userLogin.password is the password from the dataBase
    if (userLogin) {
      const isMatch = await bcrypt.compare(password,userLogin.password);
      console.log(isMatch + "pass Match");
 
    // When we get users password then only we will generate the tokens
    // Token Generate
    const token = await userLogin.generateAuthtoken();
    // console.log(token);

    // We Generated Cookie here
    res.cookie("Agrishop", token,{
        expires:new Date(Date.now() + 900000), // It will be expired in 15minutes
        httpOnly: true
    })


      if (!isMatch) {
        res.status(400).json({ error: "Password not matched" });
      } else {
        res.status(201).json(userLogin);
      }
    }
    else{
        res.status(400).json({ error: "Invalid Details 123" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details 123" });
  }
});


// ^ adding the data to cart api

router.post("/addcart/:id",authenticate, async(req,res)=>{
  try{
    const {id} = req.params;
    const cart = await Products.findOne({id:id});
    console.log(cart + "cart value");
    
    const UserContact = await USER.findOne({_id:req.userId});
    console.log(UserContact);

    if(UserContact){
      const cartData = await UserContact.addcartdata();
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    }
    else{
      res.status(401).json("Invalid Details");
      
    }
  }
  catch(error){ 
    res.status(401).json("Invalid USer");

  }
});

router.get("/carddetails", authenticate, async(req, res)=>{
  try{
    const buyuser = await USER.findOne({_id:req.userId});
    res.status(201).json(buyuser);
  }
  catch(error){
    console.log("Error" + error);
  }
})


module.exports = router;
 