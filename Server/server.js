const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const exercisesController = require("./controller.js")
const { getEx, createEx, updateEx, deleteEx } = exercisesController

app.get("/exercises", getEx)
app.post("/exercises", createEx)
app.put("/exercises/:id", updateEx)
app.delete("/exercises/:id", deleteEx)

app.listen(4202, (req, res) => {
    console.log('Up on 4202')
})
