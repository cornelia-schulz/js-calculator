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
        calculation.previousInputValues.push(input);
    }
    else if (input === "."){
        calculation.current += input;
        calculation.previousInputValues.push(input);
    }
    else if (input === "="){
        calculation.previousInputValues.push(input);
        calculation.numbers.push(parseFloat(calculation.current));
        calculation.current = calculateResult(calculation.numbers, calculation.operator);
        calculation.numbers = [];
        calculation.previousInputValues.push(calculation.current);
    }
    else {
        calculation.numbers.push(parseFloat(calculation.current));
        calculation.operator = input;
        calculation.current = input;
        calculation.previousInputValues.push(input);
    }      
    return calculation;
}

// display number on screen
function displayCurrentNumber() {
    
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


// display current calculation on screen


// clear top half of screen


// clear bottom half of screen


// reset (i.e. clear both parts of the screen)

startCalculator();