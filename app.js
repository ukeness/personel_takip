const express = require("express");
const users = require("./routes/user");
const testRoute = require("./routes/testRoute");
const userRoutes = require("./routes/user");

const app = express()
const port = 3000;

app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +"/public"))


app.use(users);
app.use(userRoutes);
app.use(testRoute);

console.log(__dirname)



app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})