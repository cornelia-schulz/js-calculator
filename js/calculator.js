function awesomeCalculator(){
    this.inputCollector = [];
    this.current = 0;
    this.previous = null;
    this.operator = "";
    this.equals = "";
    this.result = null;

    this.parseInput = function(input){
        // If input is a number add it to inputCollector
        if (!isNaN(parseInt(input)) || input === "."){
            if (this.equals === "="){
                this.resetCalculator();
            }
            if (this.current === 0 && input === ".") {
                this.inputCollector.push(this.current);
            }
            if (input !== "." || this.inputCollector.indexOf(".") === -1){
                this.inputCollector.push(input);
                this.current = parseFloat(this.inputCollector.join(""));
            }          
            
        }
        // If input is an operator:
        // If operator variable is empty:
           //add operator
        // If operator variable is not empty:
           // calculate result from current & previous
           // put result into current
           // clear previous
        // clear array
        // add operator to operator variable
        else if (input === "+" || input === "-" || input === "x" || input === "/"){
            if (this.equals === "="){
                this.equals = "";                
                this.result = null;
            }
            if (this.operator !== ""){
                this.current = this.calculateResult(this.previous, this.current, this.operator);                            
            }           
            if (input === "x"){ this.operator = "*"}
            else { this.operator = input };
            this.previous = this.current;
            this.current = null;
            this.inputCollector = [];
        }
        // If input is = sign, content of current to previous and inputCollector to current
        // perform calculation
        // Clear content in previous
        // Then add result of calculation into current
        // Clear operator
           // If operator is "" and current and previous 0, just put inputCollector to current 
        else if (input === "="){
            this.result = this.calculateResult(this.previous, this.current, this.operator);
            this.equals = "=";
        }

        else if (input === "AC"){
            this.resetCalculator();
        }

        else if (input === "CE"){
            this.deleteLastEntry();
        }

        this.currentDisplay = this.makeDisplayResult(this.inputCollector);
        this.displayCalculation(this.operator, this.currentDisplay, this.previous, this.equals, this.result);
    }

    // display
    this.displayCalculation = function(operator, current, previous, equals, result){
        if (previous === null && operator === "" && equals === "" && result === null){
            console.log(1);
            document.getElementById('currentNumber').innerHTML = current;
            document.getElementById('currentCalculation').innerHTML = current;
        }
        else if (previous === null && operator !== "" && equals === "" && result === null){
            console.log(2);
            document.getElementById('currentNumber').innerHTML = operator;
            document.getElementById('currentCalculation').innerHTML = current + operator;
        }  
        else if (previous !== null && operator !== "" && equals === "" && result === null){
            console.log(3);
            if (current === null){
                document.getElementById('currentNumber').innerHTML = previous;
                document.getElementById('currentCalculation').innerHTML = previous + operator;
            }
            else {
                document.getElementById('currentNumber').innerHTML = current;
                document.getElementById('currentCalculation').innerHTML = previous + operator + current;
            }            
        }
       else if (current !== null && previous !== null && operator !== "" && equals === "=" && result !== null){
            console.log(4);
            document.getElementById('currentNumber').innerHTML = result;
            document.getElementById('currentCalculation').innerHTML = previous + operator + current + equals + result;
       }           
    }

    this.makeDisplayResult = function(array){
        let output = array.join("");
        let newArray = output.split(".");
        if (newArray[0] !== ""){
            newArray[0] = parseFloat(newArray[0]);
        }      
        if (newArray.join(".") === ""){
            return null;
        }
        else { 
            return newArray.join("."); 
        }       
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
        else if (operator === "*"){
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
        this.inputCollector = [];
    }
       
    // reset (i.e. clear both parts of the screen)
    this.resetCalculator = function(){
        this.inputCollector = [0];
        this.current = 0;
        this.previous = null;
        this.operator = "";
        this.equals = "";
        this.result = null;
    }

}