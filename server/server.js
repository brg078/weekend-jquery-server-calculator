const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;


let calcCrud = [];
let publishList = [];

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));

function mathIsHard(){
    // publishList=[];
    // for (i=0;i<calcCrud.length;i++){
        if (calcCrud[calcCrud.length-1].op == 'plus') {
            publishList.push(calcCrud[calcCrud.length-1].first,' + ',calcCrud[calcCrud.length-1].second,' = ',
            (Number(calcCrud[calcCrud.length-1].first) + Number(calcCrud[calcCrud.length-1].second)));    
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
        
        }
    

//}

app.post('/calcCrud', (req, res)=>{
    console.log('in calcCrud POST');
    calcCrud.push(req.body);
    res.sendStatus(200);
    
    console.log(calcCrud);
    mathIsHard();
});

app.get( '/calcCrud', ( req, res )=>{
    res.send(publishList);
    clear();
    console.log('in /calcrud serverside');
})

function clear(){
    publishList=[];
    calcCrud=[];
}

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })