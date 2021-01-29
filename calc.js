// References code from Lecture 2
//

(function () {
    "use strict";
    let state = 0;
    let textstate = 0;

    let firstNum = "";
    let secondNum = "";
    let operator = "";

    function onButtonPress(){
        let screen = document.getElementById("screen");

        console.log(this.textContent)
        console.log(firstNum)

        if (textstate == 0){
            screen.value = "" + screen.value + this.textContent
        } else {
            screen.value = this.textContent
            textstate--;
        }

        console.log("first" + firstNum)
        console.log("operator" + operator)
        // if (firstNum === screen.value) {
        //     console.log("Correct text content")
        //     screen.value = this.textContent
        // } else {
        //     console.log("Other text content" + firstNum)
        //     screen.value = "" + screen.value + this.textContent
        // }

    }

    function evaluate(first, second, op) {
        if (op === "+/=") {
            console.log(first, second, op)
            return parseFloat(first) + parseFloat(second); 
            // return parseInt(first) + parseInt(second);
        } else if (op === "-") {
            return parseFloat(first) - parseFloat(second);
        } else if (op === "÷") {
            return first / second; 
        } else if (op === "*") {
            return first * second;
        }
    }

    function onButtonPressFunction(){
        console.log(operator)
        let screen = document.getElementById("screen");
        if (state === 0) {
            firstNum = screen.value;
            screen.value = "0";
            operator = this.textContent;
            state++; 
        } else if (state === 1) {
            console.log(state)
            screen.value = evaluate(firstNum, screen.value, operator);
            firstNum = screen.value;
            operator = this.textContent;
            // state++;
            textstate++;
        }

        // state 0
        // Number: appends to eachtoerh 
        // operator does nothing at first 

        // state 1
        // 


        // if ((firstNum === "") && (screen.value !== "")) {
        //     console.log("First Num Screen Value is " + screen.value)
        //     firstNum = screen.value;
        //     screen.value = "";
        //     operator = this.textContent;
        // } else if((firstNum !== "") && (secondNum === "") && (screen.value !== "")) {
        //     if (operator === "") {
        //         operator = this.textContent
        //     }
        //     screen.value = evaluate(firstNum, screen.value, operator);
        //     firstNum = screen.value;
        //     secondNum = "";
        //     operator = "";
        // } 
    }

    // Design Decision decimals must be preceded by 0
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

    }

    window.addEventListener("load", init, false)
})();