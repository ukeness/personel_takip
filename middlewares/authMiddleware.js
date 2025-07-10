const jwt = require("jsonwebtoken")
require("dotenv").config();
async function authToken(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Token Bulunamadı"});

    jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
        if(err) return res.send(403).json({message: "Token geçersiz veya süresi dolmuş"});
        req.user = user;
        console.log("user-----------: " + req.user);
        next();
    });
}

module.exports = authToken 