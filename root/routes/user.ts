const express = require("express");
const users = require("../Controllers/getUser")
const loginController = require("../Controllers/loginController");
const authToken  = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/dashboard", authToken, (req,res) => {
    res.render("user/dashboard")
})


module.exports = router;