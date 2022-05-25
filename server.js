////////////////////////
// Setup - Import deps and create app object
////////////////////////
require("dotenv").config()
const { PORT, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
//////////////////////
// Declare Middleware
//////////////////////

//////////////////////
// Database Connection
//////////////////////
mongoose.connect(DATABASE_URL)
mongoose.connection
    .on("open", () => console.log("You are connected to MongoDB"))
    .on("close", () => console.log("You are disconnected from MongoDB"))
    .on("error", (error) => console.log(error))
///////////////////////
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show
app.get("/", (req, res) => {
    res.send("hello world")
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => console.log(`tunned to ----> ${PORT}`))