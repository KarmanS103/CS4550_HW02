/*
    Pieces of this code are based on code from Professor Nat Tuck's Lecture 2 and Lecture 3 class code. 
*/

/* Design Decisions:
    - After a calculation is performed, the resulting value is displayed on the screen, if a user repeatedly
    - clicks on another operation button, the returned value is added to itself
    - Decimals must be preceded by 0; i.e. if you wanted to enter .25, it must be entered as 0.25 
*/
(function () {
    "use strict";
    // State of the calculator changes depending on if it has two numbers to perform an
    // operation or not.
    let state = 0;
    // Text state changes depending on if the numbers need to be appended on to eachother, i.e. 
    // 1 + 1 is 11 instead of clearing the text and starting a new number.
    let textstate = 0;
    // Variable to hold the first number and subsequent results that the user calculates. 
    let firstNum = "";
    // Holds the operation to be performed on the two numbers (+, -, *, or /)
    let operator = "";

    /*
        Whenever a digit button is pressed, the text value of that button either replaces the 
        value on the "screen" or appends the value to the string on "screen"
    */
    function onButtonPress(){
        let screen = document.getElementById("screen");

        if (textstate == 0){
            screen.value = "" + screen.value + this.textContent
        } else {
            screen.value = this.textContent
            textstate--;
        }
    }

    /*
        Given two numbers in string form and a math operator also in string form, performs the respective
        math operation on both numbers and returns the result. 
    */
    function evaluate(first, second, op) {
        if (op === "+/=") {
            console.log(first, second, op)
            return parseFloat(first) + parseFloat(second); 
        } else if (op === "-") {
            return parseFloat(first) - parseFloat(second);
        } else if (op === "÷") {
            return parseFloat(first) / parseFloat(second); 
        } else if (op === "*") {
            return parseFloat(first) * parseFloat(second);
        }
    }
    
    /*
        Grabs the entered number on screen when the operation button is pressed and performs the operation 
        or stores the number if a second number has not yet been provided. 
    */
    function onButtonPressFunction(){
        console.log(operator)
        let screen = document.getElementById("screen");
        if (state === 0) {
            firstNum = screen.value;
            screen.value = "";
            operator = this.textContent;
            state++; 
        } else if (state === 1) {
            console.log(state)
            screen.value = evaluate(firstNum, screen.value, operator);
            firstNum = screen.value;
            operator = this.textContent;
            textstate++;
        }
    }

    /*
        When the decimal button is pressed, checks to make sure the number on screen doesn't yet have a decimal 
        in it and then adds one if it does not. 
    */
    function onDecimalButtonPress(){
        let screen = document.getElementById("screen");
        let decimalExists = screen.value.includes(".")

        if ((decimalExists) && (operator !== "")) {
            return
        }

        if ((textstate == 0) && !decimalExists){
            screen.value = "" + screen.value + this.textContent
        } else{
            screen.value = this.textContent
            textstate--;
        }
    }

    /**
     * Resets all of the variables in the calculator back to their original settings. 
     */
    function onClearButtonPress(){
        let screen = document.getElementById("screen");
        screen.value = "";
        state = 0;
        textstate = 0;
        firstNum = "";
        operator = "";
    }

    /**
     * Adds event handlets to all of the buttons of the calculator.
     */
    function init(){
        let btns = document.getElementsByClassName("number");
        let add_btns = Array.from(btns);

        add_btns.forEach(function(btn){
            btn.addEventListener("click", onButtonPress);
        });

        let ops = document.getElementsByClassName("operator");
        let add_ops = Array.from(ops)
        add_ops.forEach(function(op){
            op.addEventListener("click", onButtonPressFunction)
        });

        let dec = document.getElementsByClassName("decimal");
        let add_dec = Array.from(dec)
        add_dec.forEach(function(dec){
            dec.addEventListener("click", onDecimalButtonPress)
        });

        let clear = document.getElementsByClassName("clear");
        let add_clear = Array.from(clear)
        add_clear.forEach(function(cle){
            cle.addEventListener("click", onClearButtonPress)
        });
    }


    
    /**
     * Adds all Event Listeners to the window 
     */
    window.addEventListener("load", init, false)
})();