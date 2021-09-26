const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const auctions = require('../data/replicas')
const router = express.Router();

// // Return auction list (auctions)
// router.get('', (req,res)=> {
//
//     // Create empty list for the usernames
//     const listReplicas = [];
//
//     // for each user in users, push all usernames to the list created above
//     for (const replica of auctions) {
//         let jsonReplica = `{"name" : "${replica.name}", "link" : "http://localhost:3000/replicas/auction/${replica.id}"}`;
//         let replicaObj = JSON.parse(jsonReplica);
//         listReplicas.push(replicaObj);
//     }
//
//     if (listReplicas)
//         res
//             .status(StatusCodes.OK)
//             .send(listReplicas);
//     else
//         res
//             .status(StatusCodes.NOT_FOUND)
//             .send('');
// })

// Return single auction
router.post('/:id', (req,res)=> {
    let exists = false;
    for (const replica of auctions) {
        if (replica.id == req.params.id) {
            exists = true;
            res
                .status(StatusCodes.OK)
                .send(replica);
        }
    }
    if (!exists)
        res
            .send('Resource not found!');
})


// Search by parameter
router.get('', (req,res, next)=> {
    const filter = req.query.name;
    const filteredList = [];
    for (let replica of auctions) {
        const str = replica.name;

        if (str.toLowerCase().includes(filter.toLowerCase())) {
            console.log(replica);
            filteredList.push(replica);
        }
    }

    if (filteredList)
        res
            .status(StatusCodes.OK)
            .send(filteredList);
    else
        res
            .status(StatusCodes.NOT_FOUND)
            .send('No results');

})

module.exports = router;