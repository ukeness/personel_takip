const express = require("express");
const path = require("path");
const { testController } = require("../Controllers/testController");
const router = express.Router();

router.get("/users/:id", (req,res,next) => {
    res.send(testController())
})

router.get("/users", testController)

module.exports = router;