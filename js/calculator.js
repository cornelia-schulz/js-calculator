function awesomeCalculator(){
    this.inputCollector = [];
    this.current = null;
    this.previous = null;
    this.operator = "";
    this.displayInput = "";
    this.displayCalculation = "";

    this.getInput = function(input){
        // If input is a number add it to inputCollector
        if (!isNaN(parseInt(input)) || input === ".") {
            this.inputCollector.push(input);
            this.displayInput = this.inputCollector.join("");
        }
        
        // If input is AC, clear the whole screen and reset the calculator
        else if (input === "AC"){
            resetCalculator();
            this.displayInput = "0";
        }
    
        // If input is CE, remove only the last entry 
        else if (input === "CE"){
            deleteLastEntry();
            this.displayInput = "0";
        }
    
        // If input is = sign, content of current to previous and inputCollector to current
        // perform calculation
        // Clear content in previous
        // Then add result of calculation into current
        // Clear operator
           // If operator is "" and current and previous 0, just put inputCollector to current 
        else if (input === "="){
            if (this.operator !== ""){
                this.previous = this.current;
                this.current = parseFloat(this.inputCollector.join(""));
                this.current = this.calculateResult(this.previous, this.current, this.operator);
                this.previous = null;
                this.operator = "";
                this.inputCollector = [];
            }
            else {
                this.current = parseFloat(this.inputCollector.join(""));
            }
            this.displayInput = this.current;
            
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
            if(this.operator === ""){
                if (this.current !== null){
                    this.previous = calculator.current;               
                }
                if (this.inputCollector.length > 0){
                    this.current = parseFloat(this.inputCollector.join(""));
                    this.inputCollector = [];
                }
                
            }
            else {
                this.previous = this.current;
                this.current = parseFloat(this.inputCollector.join(""));
                this.current = this.calculateResult(this.previous, this.current, this.operator);
                this.previous = null; 
            }
            this.operator = input;
            this.displayInput = input;
        }
        this.displayCurrentNumber(this.displayInput);
        console.log("InputCollector: " + this.inputCollector);
        console.log("Current: " + this.current);
        console.log("Previous: " + this.previous);
        console.log("Operator: " + this.operator);
    }
    
    // display current input on screen
    this.displayCurrentNumber = function(input) {        
        document.getElementById('currentNumber').innerHTML = input;  
    }

    // display calculation on screen
    this.displayCalculation = function() {
        document.getElementById('currentCalculation').innerHTML = "";
    }
    
    // calculate result
    this.calculateResult = function(a, b, operator){
        console.log(a + operator + b);
        var result;
        if (operator === "+"){
            result = sum(a, b);
        }
        else if (operator === "-"){
            result = substract(a, b);
        }
        else if (operator === "x"){
            result = multiply(a, b);
        }
        else if (operator === "/"){
            result = divide(a, b);
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
    this.deleteLastEntry = function(){
        this.current = null;
        this.inputCollector.pop();
    }
    
    
    // reset (i.e. clear both parts of the screen)
    this.resetCalculator = function(){
        this.inputCollector = [];
        this.current = null;
        this.previous = null;
        this.operator = "";
    }

}