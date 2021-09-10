const express = require('express');
const app = express();
const port = 3000;


let data = require('./data/data')

app.get('/', (req,res) => {
    console.log("test")
    res.send(data)
})

app.listen(port);