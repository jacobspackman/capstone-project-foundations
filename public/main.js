const setsPlusBtn = document.querySelector('#sets-plus-btn')
const setsMinusBtn = document.querySelector('#sets-minus-btn')
const repsPlusBtn = document.querySelector('#reps-plus-btn')
const repsMinusBtn = document.querySelector('#reps-minus-btn')
const setsNumber = document.querySelector('#sets-counter-number')
const repsNumber = document.querySelector('#reps-counter-number')
let repCount = 0;
let setCount = 0;

const setsCounterPlus = () => {
    
        setCount = setCount + 1
        setsNumber.textContent = `${setCount}`
}

const setsCounterMinus = () => {
    
    if(setCount > 0){
        setCount = setCount - 1
        setsNumber.textContent = `${setCount}`
    }
}

setsPlusBtn.addEventListener("click", setsCounterPlus)
setsMinusBtn.addEventListener("click", setsCounterMinus)

const repsCounterPlus = () => {
    
    repCount = repCount + 1
    repsNumber.textContent = `${repCount}`
}

const repsCounterMinus = () => {
    
    if(repCount > 0){
        repCount = repCount - 1
        repsNumber.textContent = `${repCount}`
    }
}

repsPlusBtn.addEventListener("click", repsCounterPlus)
repsMinusBtn.addEventListener("click", repsCounterMinus)


const exercisesContainer = document.querySelector('.exercise-cards')
const form = document.querySelector('.workout-planner-form')

const baseURL = 'http://127.0.0.1:4202/exercises'

const exercisesCallback = ({ data: exercises}) => {
    displayExercises(exercises)
}


const getAllExercises = () => axios.get(baseURL).then(exercisesCallback)
const createExercise = body => axios.post(baseURL, body).then(exercisesCallback)
const deleteExercise = id => axios.delete(`${baseURL}/${id}`).then(exercisesCallback)
const updateExercise = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(exercisesCallback)


function submitHandler() {

    let exercise = document.querySelector('#exercises')
    let sets = document.querySelector('#sets-counter-number')
    let reps = document.querySelector('#reps-counter-number')
    let type = document.querySelector('#exercise-type')

    let bodyObj = {
        exercise: exercise.value,
        sets: +sets.innerHTML,
        reps: +reps.innerHTML,
        type: type.value
    }

    console.log(sets)
    createExercise(bodyObj)

    exercise.value = ''
    sets.value = 0
    reps.value = 0
    type.value = ''
}

function createExerciseCard(exercise) {
    const exerciseCard = document.createElement('div')
    exerciseCard.classList.add('exercise-card')

    exerciseCard.innerHTML = `<h2>${exercise.exercise}</h2>
    <div class="sets-btns-container">
        <button class="btn" onclick="updateExercise(${exercise.id}, 'minusSet')">-</button>
        <p class="sets-number">Sets: ${exercise.sets}</p>
        <button class="btn" onclick="updateExercise(${exercise.id}, 'plusSet')">+</button>
    </div>
    <div class="reps-btns-container">
        <button class="btn" onclick="updateExercise(${exercise.id}, 'minusRep')">-</button>
        <p class="reps-number">Reps: ${exercise.reps}</p>
        <button class="btn" onclick="updateExercise(${exercise.id}, 'plusRep')">+</button>
    </div>
    <p>Type: ${exercise.type}</p>
    <button onclick="deleteExercise(${exercise.id})" class="delete-btn-card btn">delete</button>
    `

    exercisesContainer.appendChild(exerciseCard)
}

function displayExercises(arr) {
    exercisesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createExerciseCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllExercises()


//workout

const workoutForm = document.querySelector('#workout-name-form')
const workoutDeleteBtn = document.querySelector('#delete-workout-btn')

const workoutCallback = ({ data: workouts }) => {
    displayWorkouts(workouts)
    console.log(workouts)
}

const getAllWorkouts = () => axios.get(baseURL).then(workoutCallback)
const createWorkout = body => axios.post(baseURL, body).then(workoutCallback)
const deleteWorkout = id => axios.delete(`${baseURL}/${id}`).then(workoutCallback)

const workoutContainer = document.querySelector('.workout-link-container')

function createWorkoutNav(workout) {
    const workoutLink = document.createElement('div')

    workoutLink.innerHTML = `<button class="workout-btn">${workout.name}</button>`

    workoutContainer.appendChild(workoutLink)
}

function displayWorkouts(arr) {
    workoutContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createWorkoutNav(arr[i])
    }
}

// let allExercises = require('./../db.json')

function workoutSubmitHandler() {
    let name = document.querySelector('.workout-name-input')

    let workoutBodyObj = {
        name: name.value,
        // exercises: allExercises
    }

    createWorkout(workoutBodyObj)

    name = ""
}

function workoutDelete(id) {
    deleteWorkout(id)
}

workoutDeleteBtn.addEventListener('click', workoutDelete)
workoutForm.addEventListener('submit', workoutSubmitHandler)

getAllWorkouts()