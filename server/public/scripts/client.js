// console.log('in client JS');

let operator = 0;
let dataToSend = {};
let returnData = '';

$(document).ready(onReady);             //
function onReady() {
    $('#plusButton').click(addPlusOperator);
    $('#minusButton').click(addMinusOperator);
    $('#multiplyButton').click(addMultiplyOperator);
    $('#divideButton').click(addDivideOperator);
    $('#clearButton').click(clearInputFields);
    $('#equalsButton').click(calculate);
    $.ajax({
        method: 'GET',
        url: '/calcCrud',
        // console.log('made it back to get', response);
    }).then(function(response) {
        returnData = response;
        // returnData = (`${response[0]} ${response[1]} ${response[2]} ${response[3]} ${response[4]}`);
        console.log('Data returned:',returnData);
        render(returnData)
    }).catch(function(err) {
        alert('Unable to get messages.')
        console.log(err); 
    }) // call get function();
}                                      //END onReady


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
    let firstNumber = $('#numberOne').val();
    let secondNumber = $('#numberTwo').val();
    console.log(firstNumber,operator,secondNumber);
    if (operator == 0) {
        alert('Please make sure you have an operator selected!');
        console.log('no operator')
    } else if (firstNumber == '' || secondNumber == '') {
        alert('Please make sure you have both fields filled with a number!')
        console.log('missing numbers')
    } else {        
        let calculationObject = {
            first: firstNumber,
            second: secondNumber,
            op: operator
            };
        dataToSend = calculationObject;
        sendData(dataToSend);
    }
}

function sendData(){ 
    console.log('This is the data to send:',dataToSend);
    $.ajax({
        method: 'POST',
        url: '/calcCrud',
        data: dataToSend
    }).then(function(response) {
        // clearInputFields();
        $.ajax({
            method: 'GET',
            url: '/calcCrud',
            // console.log('made it back to get', response);
        }).then(function(response) {
            returnData = response;
            // returnData = (`${response[0]} ${response[1]} ${response[2]} ${response[3]} ${response[4]}`);
            console.log('Data returned:',returnData);
            render(returnData)
        }).catch(function(err) {
            alert('Unable to get messages.')
            console.log(err);
    })
    }).catch(function(err) {
        alert('Error sending message.');
        console.log(err);
    })
    
}   //END AJAX POST


// function render() {
//     $('#numberOne').val('');
//     $('#numberTwo').val('');
//     $('#resultCurrent').val('');
//     $('#resultCurrent').prepend(`<p>${returnData}</p>`);
//     returnData='---';
    
    // console.log(operator);
//}

function render(returnData) {
    // insert GET function when clean


    let publishData = returnData;
    console.log(publishData);
    $('#numberOne').val('');
    $('#numberTwo').val('');
    $('#resultCurrent').empty('');
    console.log('in render',returnData);


      for (i=0; i<publishData.length; i++) {
    // //      for (let object of objects) {
               $('#resultCurrent').prepend(`<li>${publishData[i]}</li>`);
        
      }
    // returnData='';
    
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