const express = require('express');
const app = express();
const port = 4444;

//app.use(express.json());

let data = require('../data/data')

app.get('/', (req,res) => {
    console.log("test")
    res.send(data)
})

app.listen(port);

//Voorbeelden
app.post('/join', function(request, responde){
    response.send('got it!')
    response.end();
});

app.get('/articles/:name', function(request, responde){
    response.end('rendering ' + request.params.name)
});