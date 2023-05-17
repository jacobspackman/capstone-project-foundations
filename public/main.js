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

const baseURL = 'http://127.0.0.1:5500/public/index.html?/exercises'

const exercisesCallback = ({ data: exercises }) => displayExercises(exercises)


const getAllExercises = () => axios.get(baseURL).then(exercisesCallback)
const createExercise = body => axios.post(baseURL, body).then(exercisesCallback)
const deleteExercise = id => axios.delete(`${baseURL}/${id}`).then(exercisesCallback)
const updateExercise = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(exercisesCallback)

function submitHandler() {

    let exercise = document.querySelector('#exercises')
    let sets = setsNumber
    let reps = repsNumber
    let type = document.querySelector('#exercise-type')

    let bodyObj = {
        exercise: exercise.value,
        sets: sets.value,
        reps: reps.value,
        type: type.value
    }

    createExercise(bodyObj)

    exercise.value = ''
    sets.value = 0
    reps.value = 0
    type.value = ''
}

function createExerciseCard(exercise) {
    const exerciseCard = document.createElement('div')
    exerciseCard.classList.add('exercise-card')

    exerciseCard.innerHTML = `<h3>${exercise.exercise}</h3>
    <div class="sets-btns-container">
        <button onclick="updateExercise(${exercise.id}, 'minus')">-</button>
        <p class="sets-number">$${exercise.sets}</p>
        <button onclick="updateExercise(${exercise.id}, 'plus')">+</button>
    </div>
    <div class="reps-btns-container">
        <button onclick="updateExercise(${exercise.id}, 'minus')">-</button>
        <p class="reps-number">$${exercise.reps}</p>
        <button onclick="updateExercise(${exercise.id}, 'plus')">+</button>
    </div>
    <p>type: ${exercise.type}</p>
    <button onclick="deleteExercise(${exercise.id})">delete</button>
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



