require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/user")

const app = express()
const port = 3000;

exports.session = ({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
})

app.set("view engine", "ejs")

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +"/public"))

app.use("/login", loginRoutes)
app.use("/", userRoutes)


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})