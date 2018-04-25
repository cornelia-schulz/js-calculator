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
    current: ""
}


function runCalculator(){
    
    displayCurrentNumber(this.value);
    

}


// calculate result
function calculateResult(numbers){
    
}


// display number on screen
function displayCurrentNumber(input) {
    if (input === "0" || input === "1" || input === "2" || input === "3" || input === "4" || input === "5" || input === "6" || input === "7" || input === "8" || input === "9") {
        input = parseInt(input);      
        if(calculation.previousInputValues.length > 0){
            if(typeof(calculation.previousInputValues[calculation.previousInputValues.length-1]) === 'number'){
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
    else if (input === "="){
        calculation.current = calculateResult(calculation.previousInputValues);
    }
    else {
        calculation.current = input;
    }    
    calculation.previousInputValues.push(input);
    document.getElementById('currentNumber').innerHTML = calculation.current;
    document.getElementById('currentCalculation').innerHTML = calculation.previousInputValues.join("");
    return calculation;
}

// display current calculation on screen


// clear top half of screen


// clear bottom half of screen


// reset (i.e. clear both parts of the screen)

startCalculator();