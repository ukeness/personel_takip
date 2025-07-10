import express from "express"
const users = require("../Controllers/getUser")
const loginController = require("../Controllers/loginController");
import authToken from "../middlewares/authMiddleware";
const router = express.Router();


router.get("/dashboard", authToken, (req: any,res: any) => {
    res.render("user/dashboard")
})


module.exports = router;