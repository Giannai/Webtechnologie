const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const router = express.Router();

router.get('', (req,res)=>{
    res.send('Dit wordt een lijst met users');
})

router.post ('',isLoggedIn,(req,res)=>{
    res
        .status(StatusCodes.CREATED)
        .send('Logged in');
})

module.exports = router;