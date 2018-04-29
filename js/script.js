/*
Get input by determining which button was pressed
display the input on the screen
*/

// add Listeners for button presses
function startCalculator(){
    var buttons = document.getElementsByClassName('calculator-button');
    for (var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', runCalculator);
    }
}

// create a new instance of the calculator
let calculator = new awesomeCalculator();

// start the calculator when a button is clicked
function runCalculator(){    
    calculator.parseInput(this.value);
}

startCalculator();