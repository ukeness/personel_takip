const express = require("express");
const users = require("../Controllers/getUser")
const loginController = require("../Controllers/loginController")
const router = express.Router();


router.get("/", (req: any,res: any) => {
    res.render("login")
})
router.post("/", loginController.login);


module.exports = router;