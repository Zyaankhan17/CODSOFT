// DOM Elements
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const clearButton = document.querySelector('.all-clear');
const deleteButton = document.querySelector('.delete');
const equalsButton = document.querySelector('.equals');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');

// Calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// Update the display
function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandElement.innerText = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandElement.innerText = previousOperand;
    }
}

// Get symbol for operation
function getOperationSymbol(operation) {
    switch(operation) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return '';
    }
}

// Add digit to current operand
function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        // Prevent adding multiple decimal points
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }
}

// Choose operation
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
}

// Perform calculation
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

// Clear the calculator
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

// Delete the last digit
function deleteDigit() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
}

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.getAttribute('data-operation'));
        updateDisplay();
    });
});

// Event listener for equals button
equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

// Event listener for delete button
deleteButton.addEventListener('click', () => {
    deleteDigit();
    updateDisplay();
});

// Initialize display
updateDisplay();