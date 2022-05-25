////////////////////////
// Setup - Import deps and create app object
////////////////////////
require("dotenv").config()
const { PORT, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
////////////////////////
// Models
////////////////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})
const People = mongoose.model("People", PeopleSchema)
//////////////////////
// Declare Middleware
//////////////////////
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
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

app.get("/people", async (req, res) => {
    try {
        res.json( await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post("/people", async (req, res) => {
    try {
        res.json( await People.create(req.body))
    } catch {
        res.status(400).json(error)
    }
})

app.delete("/people/:id", async (req, res) => {
    try {
        res.json( await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put("/people/:id", async (req, res) => {
    try {
        console.log(`this is the req.param.id ---> ${req.params.id}`)
        res.json( await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => console.log(`tunned to ----> ${PORT}`))