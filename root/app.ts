require('dotenv').config();
import express from 'express';
import sequelize from "../root/config/config"
const cookieParser = require("cookie-parser");

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

const app = express()
const port = 3000;

sequelize.sync().then(() => {
    console.log("Sequelize synced")
}).catch((err) => {
    console.log("Database cannot synced: ", err);
})
app.set("view engine", "ejs")

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +"/public"))

app.use("/", loginRoutes)
app.use("/", userRoutes)
app.use("/admin", adminRoutes)


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})