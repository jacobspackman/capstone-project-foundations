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

let userExercises = []

const exercisesCallback = ({ data: exercises }) => {
    displayExercises(exercises)
}

// const getAllExercises = () => axios.get(baseURL).then(exercisesCallback)
// const createExercise = body => axios.post(baseURL, body).then(exercisesCallback)
const deleteExercise = id => {
    const idx = userExercises.findIndex(exercise => exercise.id === +id)
        if(idx >= 0){
            userExercises.splice(idx, 1)
            displayExercises(userExercises)
        }
}
const updateExercise = (id, type) => {
    // console.log('hit update exercise', id, type)
    const idx = userExercises.findIndex(exercise => exercise.id === +id)
    // console.log(idx)
    if(type === 'plusRep'){
        userExercises[idx].reps += 1
    }else if(type === 'minusRep'){
        userExercises[idx].reps -= 1
    }else if (type === 'plusSet'){
        userExercises[idx].sets += 1
    }else {
        userExercises[idx].sets -= 1
    }

    displayExercises(userExercises)
}


function submitHandler(e) {
    e.preventDefault()
    let exercise = document.querySelector('#exercises')
    let sets = document.querySelector('#sets-counter-number')
    let reps = document.querySelector('#reps-counter-number')
    let type = document.querySelector('#exercise-type')

    let bodyObj = {
        id: userExercises.length+1,
        exercise: exercise.value,
        sets: +sets.innerHTML,
        reps: +reps.innerHTML,
        type: type.value
    }

    
    userExercises.push(bodyObj)
    exercisesContainer.innerHTML = ""
    userExercises.forEach(exer => {
        // console.log(exer.id)
        createExerciseCard(exer)
    })

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

// getAllExercises()


//workout

const workoutBaseURL = 'http://127.0.0.1:4202/workouts'


const workoutForm = document.querySelector('#workout-name-form')
const updateWorkoutBtn = document.querySelector('#update-workout-btn')
const workoutDeleteBtn = document.querySelector('#delete-workout-btn')
const clearBtn = document.querySelector('#clear-btn')

const workoutCallback = (res) => {
    displayWorkouts(res.data)
}

const oneWorkoutCallback = (res) => {
    userExercises = res.data.exercises
    displayExercises(userExercises)
    workoutForm.classList.add('hidden')
    updateWorkoutBtn.classList.remove('hidden')
    clearBtn.classList.remove('hidden')
}

const getAllWorkouts = () => axios.get(workoutBaseURL).then(workoutCallback)
const getOneWorkout = id => axios.get(`http://127.0.0.1:4202/one-workouts/${id}`).then(oneWorkoutCallback)
const createWorkout = body => axios.post(workoutBaseURL, body).then(workoutCallback)
const deleteWorkout = id => axios.delete(`${workoutBaseURL}/${id}`).then(workoutCallback)
const updateWorkout = (id, body) => axios.put(`http://127.0.0.1:4202/update-workouts/${id}`, body).then(workoutCallback)

const workoutContainer = document.querySelector('.workout-link-container')

function createWorkoutNav(workout) {
    // console.log(workout)
    const workoutLink = document.createElement('div')
    workoutLink.classList.add('workout-link')

    workoutLink.innerHTML = `<button onclick="getOneWorkout(${workout.id})" class="workout-btn">${workout.name}</button>`
    workoutDeleteBtn.innerHTML = `<button onclick="deleteWorkout(${workout.id})" id="delete-workout-btn">Delete Workout</button>`
    updateWorkoutBtn.innerHTML = `<button onclick="updateWorkout(${workout.id}, ${userExercises})" id="update-workout-btn" class="hidden btn">Update Workout</button>`

    workoutContainer.appendChild(workoutLink)
}

function displayWorkouts(arr) {
    workoutContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createWorkoutNav(arr[i])
    }
}


function workoutSubmitHandler() {

    let name = document.querySelector('.workout-name-input')
    
    let workoutBodyObj = { 
        name: name.value,
        exercises: userExercises
    }

    createWorkout(workoutBodyObj)
    
    name = ""
}

function clear() {
    exercisesContainer.innerHTML = ``
    workoutForm.classList.remove('hidden')
    updateWorkoutBtn.classList.add('hidden')
    clearBtn.classList.add('hidden')
}

clearBtn.addEventListener('click', clear)
workoutDeleteBtn.addEventListener('click', clear)
workoutForm.addEventListener('submit', workoutSubmitHandler)

getAllWorkouts()