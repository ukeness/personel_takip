const express = require("express");
const router = express.Router();
const {testController} = require("../Controllers/testController")

router.get("/test", async(req,res,next) => {
    const data = await testController();
    res.render("test", {data})
})

module.exports = router;