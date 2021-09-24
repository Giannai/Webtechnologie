const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const users = require('../data/users')
const router = express.Router();

router.get('', (req,res)=>{
    res.send('Dit wordt een lijst met users');

})

router.post ('',isLoggedIn,(req,res)=>{
    res
        .status(StatusCodes.CREATED)
        .send('Logged in');
})

router.delete('', (req,res)=>{
 // find user, index off, splice
    // splice returned wat je er uit haalt, niks met de return doen

    const {username} = req.body;
    var index = users.findIndex(function(user){
        return user.username === username;
    });

    let remove = users.splice(index, 1)

    console.log(users); // print updated list

    res.send(StatusCodes.OK);
})

module.exports = router;

//router.get('', (req,res)=>{}
// )