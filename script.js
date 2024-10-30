// =================================================================================
// Variables
// =================================================================================
const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let previousOperation = ''
let awaitingNextValue = false
let awaitingOperator = false

// =================================================================================
// Display Controls/Value Input logic
// =================================================================================
function sendNumValue(number) {
    // Replace Current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else {
        // Check if entering new first number after finding answer of previous equation and clears old infomation
        if (previousOperation && awaitingOperator) {
            resetAll()
        }
        // If the current display value is 0, replace, if not add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
        awaitingOperator = true
    }
}

function addDecimal() {
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.') && !awaitingNextValue && !awaitingOperator){
        calculatorDisplay.textContent = calculatorDisplay.textContent + '.'
    }
}

// =================================================================================
// Equation Logic
// =================================================================================

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)
    if (operator !== '=') {
        // If user enters another operation after entering the second number,
        // Will find the answer of the previous operation before continuing with the answer set ast the first number
        if (firstValue && !awaitingNextValue) {
            findAnswer(currentValue)
        }
        // Clears previous operation
        previousOperation = ''
        // Assign FirstValue if no value
        if (!firstValue) {
            firstValue = currentValue
        } else {
            console.log('currentValue', currentValue);
        }
        // Ready for next value, store operator
        awaitingOperator = false
        awaitingNextValue = true
        operatorValue = operator
        console.log(firstValue);
    } else if (firstValue && !awaitingNextValue) {
        findAnswer(currentValue)
    }
}

// Evaluates answer
function findAnswer(finaleValue) {
    // If user pressing equals without changing any values, applies same operation to new first number
    if (firstValue && awaitingOperator && previousOperation) {
        answer = eval(firstValue + previousOperation)
    } else {
        // Else usings values entered to evaluate answers
        answer = eval(firstValue + operatorValue + finaleValue)
        previousOperation = operatorValue + finaleValue
    }
    // Ready for next equation
    firstValue = answer
    awaitingOperator = true
    calculatorDisplay.textContent = answer
}

// =================================================================================
// Clear Data
// =================================================================================

// Reset all values, display
function resetAll() {
    calculatorDisplay.textContent = '0'
    firstValue = 0
    operatorValue = ''
    previousOperation = ''
    awaitingNextValue = false
    awaitingOperator = false
}

// =================================================================================
// Event Listeners
// =================================================================================

// Add Event Listerners for number, operatoirs, decimal and clear buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    } else if (inputBtn.classList.contains('clear')) {
        inputBtn.addEventListener('click', () => resetAll())
    }
})