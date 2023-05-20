const workouts = require("./workoutdb.json")
let newWorkoutId = 2

module.exports = {
    getWorkouts: (req, res) => {
        console.log(workouts)
        res.status(200).send(workouts)
    },

    getOneWorkouts: (req, res) => {
        const { id } = req.params;
        const idx = workouts.findIndex(workout => workout.id === +id)
        if(idx >= 0){
            res.status(200).send(workouts[idx])
        } else{
            res.sendStatus(400)
        }
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

    updateWorkouts: (req, res) => {
        console.log('hittin')
        const { id } = req.params;
        const { body } = req.body
        const idx = workouts.findIndex(workout => workout.id === +id)
        if(idx >= 0){
            workouts[idx].push(body.exercises)
            res.status(200).send(workouts)
        }
        }
    ,

    createWorkouts: (req, res) => {
        req.body.id = workouts.length+1
        workouts.push(req.body)
        console.log(workouts)
        res.status(200).send('Workout successfully added.')
    }
}