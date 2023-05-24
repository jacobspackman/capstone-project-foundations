const workouts = require("./workoutdb.json")
let newWorkoutId = 2

module.exports = {
    getWorkouts: (req, res) => {
        // console.log(workouts)
        res.status(200).send(workouts)
    },

    getOneWorkouts: (req, res) => {
        const { id } = req.params;
        const idx = workouts.findIndex(workout => workout.id === +id)
        if(idx >= 0){
            // console.log(workouts[idx])
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
        console.log(req.body)
        const { id } = req.params;
        for (let i = 0; i<workouts.length; i++){
            if(id === workouts.id) {
            workouts[i].push(req.body)
            res.status(200).send(workouts)
            }else {
                res.sendStatus(400)
            }}
    },

    createWorkouts: (req, res) => {
        req.body.id = workouts.length+1
        workouts.push(req.body)
        console.log(workouts)
        console.log(workouts[0].exercises)
        res.status(200).send('Workout successfully added.')
    }
}