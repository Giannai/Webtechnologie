const express = require('express');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const users = require('../data/users')

const router = express.Router();

router.post('', (req,res)=> {
    const {username, password} = req.body;
    if (username && password) {
        const token = login(username, password);
        if (token) {
            res.status(StatusCodes.CREATED).send({token: token});
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send('Username and/or password incorrect');
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send('Required parameters missing?');
    }
});

const login = (username, password) => {
    const user = users.find((user) => {
        return user.username === username;
    });

    if (user && user.password) {
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
            return jwt.sign({
                username: user.username,
                roles: user.roles,
            }, user.secret)
        }

    }
    return false;
};

module.exports = router;