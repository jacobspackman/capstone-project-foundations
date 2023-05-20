
const exercises = require("./db.json");
const newExerciseId = 3;

module.exports = {
    getEx: (req, res) => {
        res.status(200).send(exercises)
    },

    createEx: (req, res) => {
        req.body.id = newExerciseId
        exercises.push(req.body)
        res.status(200).send('exercise successfully added.')
    },

    updateEx: (req, res) => {
        const { id } = req.params;
        const { type } = req.body
        const idx = exercises.findIndex(exercise => exercise.id === +id)
        if(type === 'plusRep'){
            exercises[idx].reps += 1
            res.status(200).send(exercises)
        }else if(type === 'minusRep'){
            exercises[idx].reps -= 1
            res.status(200).send(exercises)
        }else if (type === 'plusSet'){
            exercises[idx].sets += 1
            res.status(200).send(exercises)
        }else {
            exercises[idx].sets -= 1
            res.status(200).send(exercises)
        }
    },


    deleteEx: (req, res) => {
        const { id } = req.params;
        const idx = exercises.findIndex(exercise => exercise.id === +id)
        if(idx >= 0){
            exercises.splice(idx, 1)
            res.status(200).send(exercises)
        } else{
            res.sendStatus(400)
        }
    }
}