const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const workoutController = require("./workout-controller.js")
const { getWorkouts, deleteWorkouts, createWorkouts, getOneWorkouts } = workoutController

app.get("/workouts", getWorkouts)
app.get("/one-workouts/:id", getOneWorkouts)
app.delete("/workouts/:id", deleteWorkouts)
app.post("/workouts", createWorkouts)
app.put("/workouts/:id", updateWorkouts)

app.listen(4202, (req, res) => {
    console.log('Up on 4202')
})
