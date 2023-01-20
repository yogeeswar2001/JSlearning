function display(val) {
    //let res = document.getElementById("result").value;
    document.getElementById("result").value += val;
}

function solveExp() {
    let exp = document.getElementById("result").value;
    
    // exp = eval(exp);
    try {
        exp = eval(exp);
        document.getElementById("result").value = exp;
    } catch(err) {
        alert("Enter a valid input");
    }
}

function clr() {
    document.getElementById("result").value = "";
}