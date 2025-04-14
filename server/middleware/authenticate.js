const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

// MiddleWare Function
const authenticate = async(req,res,next)=>{
    try{
        // We wil get the cookies
        const token = req.cookies.Agrishop;
        
        // We will verify cookies with secretKey
        const verifyToken = jwt.verify(token, secretKey);
        console.log(verifyToken);

        // We will get the verified user
        const rootUser = await USER.findOne({_id:verifyToken._id, "tokens.token":token});
        console.log(rootUser);

        if(!rootUser){throw new Error("User not Found")};
        req.token = token;
        req.rootuser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch(error){
        res.status(401).send("unauthorized User: no token");
        console.log(error)

    }
}

module.exports = authenticate;