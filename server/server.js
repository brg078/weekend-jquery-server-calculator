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
            // publishObject = {mathString: `${calcCrud.first} + ${calcCrud.second} = ${plusMath}`}
            let mathString = `${calcCrud.first} + ${calcCrud.second} = ${plusMath}`
            publishList.push(mathString);
                // {first: calcCrud.first,
                // second: calcCrud.second,
                // operator: calcCrud.op,
                // solution: plusMath};  
            console.log('Here is our publish object',publishObject);
        } else if (calcCrud[calcCrud.length-1].op == 'minus') {
            publishList.push(calcCrud[calcCrud.length-1].first,' - ',calcCrud[calcCrud.length-1].second,' = ',
            (Number(calcCrud[calcCrud.length-1].first) - Number(calcCrud[calcCrud.length-1].second)));    
        } else if (calcCrud[calcCrud.length-1].op == 'multiply') {

            publishList.push(calcCrud[calcCrud.length-1].first,' * ',calcCrud[calcCrud.length-1].second,' = ',
            (Number(calcCrud[calcCrud.length-1].first) * Number(calcCrud[calcCrud.length-1].second)));    
        } else if(calcCrud[calcCrud.length-1].op == 'divide') {

            publishList.push(calcCrud[calcCrud.length-1].first,' / ',calcCrud[calcCrud.length-1].second,' = ',
            (Number(calcCrud[calcCrud.length-1].first) / Number(calcCrud[calcCrud.length-1].second)));    
        } 
    console.log('after if else',publishObject)
    // publishList.push(publishObject);
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