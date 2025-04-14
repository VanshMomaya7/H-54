const mongoose = require("mongoose");

// Schema 
const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    description: String,
    discount: String,
    tagline: String
})

// Model is a way of doing CRUD operations

const Products = new mongoose.model("products", productSchema);

module.exports = Products;

// & This code will do:
/*
    ^ We created a schema at the top
    ^ Schema is the structure we want the data to store in that specified structure so we can render it to the frontEnd easily
    
    ^ Then, we created a model for performing CRUD Operations 
    ^We passed two arguments to the model: 
    ^"products" is the name of collection in our mongoDB database
    ^"productSchema" is the second argument we passed to mongoose.model so that the data is stored in this format

    ^Then we exported our model, by exporting it we can import it to other files of the code & use it there as well

    ^At the end - our data will be stored in the format we defined in the productSchema in the products collection of MongoDB

    ^So overall, this code is defining a schema and model for storing product data in MongoDB using Mongoose. The schema defines the structure of the data we want to store, and the model provides a way of CRUD operations for working with that data in MongoDB
*/