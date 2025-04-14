const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email Adderess");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  // JSON Web Token
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: [
    {
      cart: Object,
    },
  ],
});

// Before our data gets saved
// We Called a middleware function to HASH our password
// It will go 12 rounds of HASHING
// is Modified function will change the hash only when we change our password else it wont change the HASH

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }

  next();
});

// Token Generate Process
// When Password gets matched this function will be called

userSchema.methods.generateAuthtoken = async function () {
  try {
    // This is a payload - payload is of 32words
    // We stored the userID of mongoDB in the _id
    let token = jwt.sign({ _id: this._id }, secretKey);
    this.tokens = this.tokens.concat({ token: token }); //Through concat we will store the token
    await this.save(); //Save the token
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Add to cart
userSchema.methods.addcartdata = async function (cart) {
  try {
    this.carts = this.carts.concat({cart});
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error + "Error Cart");
  }
};

const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
