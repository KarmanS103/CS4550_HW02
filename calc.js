// References code from Lecture 2
//

(function () {
    "use strict";

    function onButtonPress(){
        let screen = document.getElementById("screen");

        console.log(this.textContent)
        screen.value = "" + screen.value + this.textContent
    }

    function init(){
        let btns = document.getElementsByClassName("number");
        let add_btns = Array.from(btns);

        add_btns.forEach(function(btn){
            btn.addEventListener("click", onButtonPress);
        });

    }

    window.addEventListener("load", init, false)
})();