const {v4:uuidv4} = require('uuid');

const users = [
    {
        id : 1,
        username : 'Bob',
        password : '$2a$10$toF1ZbpppAzqxqjQ8g9XT.tA6.GAJ0XETe0COpYOze2tZ.b/tFQfO', //123456
        secret : uuidv4(),
        roles : ['user']
    },
    {
        id : 2,
        username : 'John',
        password : '$2a$10$AfbhF.nujSJ/EGmGU9zCYuUY49maky6XlW5JgsWUKLN8W11jzqzFi', //0000
        secret : uuidv4(),
        roles : ['admin','user']
    },
    {
        id : 3,
        username : 'Josue',
        password : '$2a$10$ScFTpwEfpA9BRi.OMGv6WumvjukWJr1UHA15aoJSmUj2PWz2hZu0a', //Jos123
        secret : uuidv4(),
        roles : ['user']
    },

];

module.exports = users;