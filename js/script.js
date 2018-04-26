/*
Get input by determining which button was pressed
display the input on the screen
Store input
When = is pressed, compute the calculation
Display the result on the screen
When AC is pressed clear everything
When CE is pressed clear the last input
*/

// add Listeners for button presses
function startCalculator(){
    var buttons = document.getElementsByClassName('calculator-button');
    for (var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', runCalculator);
    }
}

var calculation = {
    previousInputValues: [],
    current: "0",
    numbers: [],
    operator: ""
}


function runCalculator(){    
    convertInput(this.value);   
    displayCurrentNumber();
}


// convert input
function convertInput(input){
    if (!isNaN(parseInt(input))) {      
        if(calculation.previousInputValues.length > 0){
            if(!isNaN(parseInt(calculation.previousInputValues[calculation.previousInputValues.length-1])) || calculation.previousInputValues.length-1 === "."){
                calculation.current += input.toString(); 
            }
            else {
                calculation.current = input;
            }
        }
        else {
            calculation.current = input;
        } 
    }
    else if (input === "."){
        calculation.current += input;
    }
    else if (input === "="){
        calculation.previousInputValues.push(input);
        calculation.numbers.push(parseFloat(calculation.current));
        calculation.current = calculateResult(calculation.numbers, calculation.operator);
        calculation.numbers = [];
        calculation.previousInputValues = [];
    }
    else if (input === "AC"){
        resetCalculator();
    }
    else if (input === "CE"){
        deleteLastEntry();
    }
    else {
        calculation.numbers.push(parseFloat(calculation.current));
        calculation.operator = input;
        calculation.current = input;
    }    
    return calculation;
}

function getInput(input){
    let inputCollector = [];
    let current = null;
    let previous = null;
    let operator = "";
    // If input is a number add it to inputCollector
    if (!isNaN(parseInt(input)) || input === ".") {
        inputCollector.push(input);
    }
    
    // If input is AC, clear the whole screen and reset the calculator
    else if (input === "AC"){
        resetCalculator();
    }

    // If input is CE, remove only the last entry 
    else if (input === "CE"){
        deleteLastEntry();
    }

    // If input is = sign, content of current to previous and inputCollector to current
    // perform calculation
    // Clear content in previous
    // Then add result of calculation into current
    // Clear operator
       // If operator is "" and current and previous 0, just put inputCollector to current 
    else if (input === "="){
        if (!operator === ""){
            previous = current;
            current = parseFloat(inputCollector.join(""));
            current = calculateResult(previous, current, operator);
            previous = null;
            operator = "";
        }
        else {
            current = parseFloat(inputCollector.join(""));
        }
    }
    
    // If input is an operator:
    // If operator variable is empty:
       // If current is not empty, push current to previous
       // push content of inputCollector to current
    // If operator variable is not empty:
       // calculate result from current & previous
       // put result into current
       // clear previous
    // add operator to operator variable
    else {
        if(operator === ""){
            if (current !== null){
                previous = current;
            }
            current = parseFloat(inputCollector.join(""));
        }
        else {
            previous = current;
            current = parseFloat(inputCollector.join(""));
            current = calculateResult(previous, current, operator);
            previous = null; 
        }
        operator = input;
    }

}

// display number on screen
function displayCurrentNumber() {
    calculation.previousInputValues.push(calculation.current);
    document.getElementById('currentNumber').innerHTML = calculation.current;
    document.getElementById('currentCalculation').innerHTML = calculation.previousInputValues.join("");
    
}

// calculate result
function calculateResult(numbers, operator){
    console.log("Numbers: " + numbers + " operator: " + operator);
    var result;
    if (operator === "+"){
        result = sum(numbers[0], numbers[1]);
    }
    else if (operator === "-"){
        result = substract(numbers[0], numbers[1]);
    }
    else if (operator === "x"){
        result = multiply(numbers[0], numbers[1]);
    }
    else if (operator === "/"){
        result = divide(numbers[0], numbers[1]);
    }
    return result;
}

function sum(a, b){
    return a+b;
}

function multiply(a, b){
    return a*b;
}

function substract(a, b){
    return a-b;
}

function divide(a, b) {
    return a/b;
}


// clear bottom half of screen
function deleteLastEntry(){
    calculation.current = "0";
    calculation.previousInputValues.pop();
}


// reset (i.e. clear both parts of the screen)
function resetCalculator(){
    calculation.previousInputValues = [];
    calculation.current = "0";
    calculation.numbers = [];
    calculation.operator = "";
}

startCalculator();