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

let calculator = new awesomeCalculator();

function runCalculator(){    
    calculator.parseInput(this.value);
}

startCalculator();