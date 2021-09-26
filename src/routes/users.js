const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const users = require('../data/users')
const bcrypt = require("bcrypt");
const router = express.Router();

// Print list of users
router.get('', (req,res)=> {

    // Create empty list for the usernames
    const listUsers = [];

    // for each user in users, push all usernames to the list created above
    for (const user of users) {
        listUsers.push(user.username);
    }

    if (listUsers)
    res
        .status(StatusCodes.OK)
        .send(listUsers);
    else
        res
            .status(StatusCodes.NOT_FOUND)
            .send('There are no users');

})

// Create a user
router.post ('',(req,res)=> {

    let exists = false;
    const userToAdd = req.body;

    if (userToAdd.hasOwnProperty('username')) {
        for (const user of users) {

            const result = bcrypt.compareSync(userToAdd.password, user.password);

            if (user.username === userToAdd.username && result) {
                exists = true;
            }
        }
    }

    if (exists) {
        res
            .status(StatusCodes.CONFLICT)
            .send('User already exists!');
    } else {
        let user = userToAdd;
        user.id = Object.keys(users).length + 1;
        users.push(user);
        console.log(users);
        res
            .status(StatusCodes.CREATED)
            .send('User created successfully!');
    }
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