// console.log('in client JS');



let firstNumber = 0;
let secondNumber = 0;
let operator = 0;
let dataToSend = {};
let returnData = '---';

$(document).ready(onReady);

function onReady() {// console.log('in client JQuery');
    $('#plusButton').click(addPlusOperator);
    $('#minusButton').click(addMinusOperator);
    $('#multiplyButton').click(addMultiplyOperator);
    $('#divideButton').click(addDivideOperator);
    $('#clearButton').click(clearInputFields);
    $('#equalsButton').click(calculate);
} //END onReady


function addPlusOperator() {    // console.log('in addOperator')
    operator = 'plus';
    // console.log('plus');
    console.log(operator);
} //END addPlusOperator

function addMinusOperator() {    // console.log('in addOperator')
    operator = 'minus';
    // console.log('minus');
    console.log(operator);
} //END addMinusOperator


function addMultiplyOperator() {    // console.log('in addOperator')
    operator = 'multiply';
    // console.log('multiply');
    console.log(operator);
} //END addMultiplyOperator


function addDivideOperator() {    // console.log('in addOperator')
    operator = 'divide';
    // console.log('divide');
    console.log(operator);
} //END addDivideOperator


function clearInputFields() {    // console.log('in addOperator')
    render();
}  //END clearInputFields


function calculate() {      //console.log('in calculate');
    let numeroUno = $('#numberOne').val();
    let numeroDos = $('#numberTwo').val();
    console.log(numeroDos);
    if (operator == 0) {
        alert('Please make sure you have an operator selected!');
        console.log('no operator')
    } else if (numeroUno == '' || numeroDos == '') {
        alert('Please make sure you have both fields filled with a number!')
        console.log('missing numbers')
    } else {        
        firstNumber = numeroUno;
        secondNumber = numeroDos;
        makeData();
    }
}

function makeData() {    //console.log('in sendData');
    let calculationObject = {
        first: firstNumber,
        second: secondNumber,
        op: operator
    };
    dataToSend = calculationObject;
    console.log(calculationObject);
    sendData();
}

function sendData(){ 
    console.log(dataToSend);
    $.ajax({
        method: 'POST',
        url: '/calcCrud',
        data: dataToSend
    }).then(function(response) {
        clearInputFields();
    }).catch(function(err) {
        alert('Error sending message.');
        console.log(err);
    })
    $.ajax({
        method: 'GET',
        url: '/calcCrud',
    }).then(function(response) {
        console.log('made it back to get', response);
        returnData = (`${response[0]} ${response[1]} ${response[2]} ${response[3]} ${response[4]}`);
        console.log('Data returned:',returnData);
        render();
    }).catch(function(err) {
        alert('Unable to get messages.')
        console.log(err);
    })
}   //END AJAX POST


function render() {
    $('#numberOne').val('');
    $('#numberTwo').val('');
    $('#resultCurrent').val('');
    $('#resultCurrent').prepend(`<p>${returnData}</p>`);
    returnData='---';
    
    // console.log(operator);
}




// function getCalculation () {
//     $.ajax({
//         method: 'GET',
//         url: '/calcCrud'
//     }).then (function(response){
//         console.log('getting /calCrud');
//     })
// }




//guessOne is a placeholder for data to be Created(app.post) and Read (app.get) and Updated (app.put) and Deleted (app.delete)
//concept reminder!!! app.get means to pull from the server some info, app.post means to push up to the server, app.delete is asking the server to delete the data stored in the /file
// DO ALL CALCULATIONS ON SERVER SIDE!!!

/* <button class = "math"></button>

let operator = 0

$(`.math`).click(grabSign)

function grabSign () {
    operator = $(this).text
} */