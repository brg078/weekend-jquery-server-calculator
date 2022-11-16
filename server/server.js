const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;


let calcCrud = [];
let publishList = [];

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));

function mathIsHard(){
    let publishObject = {}

        if (calcCrud.op == 'plus') {
            console.log('we are in plus mathIsHard');
            let plusMath = (Number(calcCrud.first) + Number(calcCrud.second));
            let mathString = `${calcCrud.first} + ${calcCrud.second} = ${plusMath}`;
            publishList.push(mathString);
        } 
        else if (calcCrud.op == 'minus') {
            console.log('we are in minus mathIsHard');
            let minusMath = (Number(calcCrud.first) - Number(calcCrud.second));
            let mathString = `${calcCrud.first} - ${calcCrud.second} = ${minusMath}`;
            publishList.push(mathString);
        } 
        else if (calcCrud.op == 'multiply') {
            console.log('we are in multiply mathIsHard');
            let multiplyMath = (Number(calcCrud.first) * Number(calcCrud.second));
            let mathString = `${calcCrud.first} * ${calcCrud.second} = ${multiplyMath}`;
            publishList.push(mathString);  
        } 
        else if(calcCrud.op == 'divide') {
            console.log('we are in divide mathIsHard');
            let divideMath = (Number(calcCrud.first) / Number(calcCrud.second));
            let mathString = `${calcCrud.first} / ${calcCrud.second} = ${divideMath}`;
            publishList.push(mathString);
            
            
        }
    console.log('here is a publishList',publishList);
    calcCrud = {};
}
    

app.post('/calcCrud', (req, res)=>{
    console.log('in calcCrud POST', (req.body));
    calcCrud =req.body;
    console.log('calcCrud=',calcCrud);
    mathIsHard();
    res.sendStatus(200);
    console.log(calcCrud);
    
});

app.get( '/calcCrud', ( req, res )=>{
    res.send(publishList);
    // clear();
    console.log('in /calcrud serverside',publishList);
})

// function clear(){
//     // publishList=[];
//     // calcCrud=[];
//     console.log(clear);
// }

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })