const workouts = require("./workoutdb.json")
let newWorkoutId = 2

module.exports = {
    getWorkouts: (req, res) => {
        console.log(workouts)
        res.status(200).send(workouts)
    },

    deleteWorkouts: (req, res) => {
        const { id } = req.params;
        const idx = workouts.findIndex(workout => workout.id === +id)
        if(idx >= 0){
            workouts.splice(idx, 1)
            res.status(200).send(workouts)
        } else{
            res.sendStatus(400)
        }

    },

    createWorkouts: (req, res) => {
        req.body.id = newWorkoutId
        console.log("working")
        workouts.push(req.body)
        res.status(200).send('Workout successfully added.')
    }
}