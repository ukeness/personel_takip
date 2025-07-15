require('dotenv').config();
import express from 'express';
import sequelize from "../root/config/config"
import cookieParser from "cookie-parser";

import loginRoutes  from "./routes/loginRoutes"
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"
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
app.use(express.static("public"))
console.log(process.cwd())

app.use("/admin", adminRoutes)
app.use("/", loginRoutes)
app.use("/", userRoutes)



app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})