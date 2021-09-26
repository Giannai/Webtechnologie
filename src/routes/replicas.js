const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const replicas = require('../data/replicas')
const router = express.Router();

// Return list of replicas
router.get('', (req,res)=> {

    // Create empty list for the usernames
    const listReplicas = [];

    // for each user in users, push all usernames to the list created above
    for (const replica of replicas) {
        let jsonReplica = `{"name" : "${replica.name}", "link" : "http://localhost:3000/replicas/auction/${replica.id}"}`;
        let replicaObj = JSON.parse(jsonReplica);
        listReplicas.push(replicaObj);
    }

    if (listReplicas)
        res
            .status(StatusCodes.OK)
            .send(listReplicas);
    else
        res
            .status(StatusCodes.NOT_FOUND)
            .send('There are no users');




})

// Return
router.post('/auction/:id', (req,res)=> {
    let exists = false;
    for (const replica of replicas) {
        if (replica.id == req.params.id){
            exists = true;

            res
                .status(StatusCodes.OK)
                .send(replica);
        }


    }
    if (!exists){
        res
            .status(StatusCodes.NOT_FOUND)
            .send('Resource not found!');
    }


})

module.exports = router;