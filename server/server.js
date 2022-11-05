const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let testVar = 10;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));




app.get( '/calcCrud', ( req, res )=>{
    console.log('in /calcrud serverside');
    res.send(testVar);
})

// app.post('/calcCrud', (req, res)=>{
//     console.log('in calcCrud POST');
//     calcCrud.push(req.body);
//     res.sendStatus(200);
// });

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })