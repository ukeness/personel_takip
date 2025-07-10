const db = require("../models");
const session = require("../app")
const User = db.User;

exports.GetUsers = async (req,res) => {
    try{
        
        return res.render("admin/dashboard", )
    }catch(err){
        return res.status(500).json({message: "Server hatası", error: err})
    }
}

