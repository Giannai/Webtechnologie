const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const auctions = require('../data/replicas')
const router = express.Router();

// // Return auction list (auctions)
router.get('', (req,res)=> {

    // Create empty list for the usernames
    const listReplicas = [];

    // for each user in users, push all usernames to the list created above
    for (const replica of auctions) {
        let jsonReplica = `{"name" : "${replica.name}", "link" : "http://localhost:3000/replicas/auction/${replica.id}"}`;
        let replicaObj = JSON.parse(jsonReplica);
        listReplicas.push(replicaObj);
    }

    res.status(listReplicas ? StatusCodes.OK : StatusCodes.NOTFOUND).send(listReplicas ? listReplicas : 'Not found.');
})

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
    res.status(!exists && StatusCodes.NOT_FOUND).send(!exists && 'Resource not found!');
})


// Search by parameter
router.get('/search', (req,res)=> {

    const filter = req.query.name;
    const filteredList = [];
    for (let replica of auctions) {
        const str = replica.name;

        if (str.toLowerCase().includes(filter.toLowerCase())) {
            console.log(replica);
            filteredList.push(replica);
        }
    }

    res.status(filteredList ? StatusCodes.OK : StatusCodes.NOTFOUND).send(filteredList ? filteredList : 'No results.');
})


// Filter the auction list with 3 different types of attributes
router.get('/filter', (req,res)=> {

    // Filter by attributes
    // type
    // system
    // material

    const attribs = [];

    for (let key in req.query)
        if (key != null)
            attribs.push(key);

    console.log('attributes: ' + attribs); // Print list of attributes used in query, it is possible to select 1 to 3

    const values = [];
    for (let i = 0; attribs.length > i; i += 1){
        values.push(req.query[attribs[i]]);
    }


    console.log('values: ' + values); // Print all query parameters


    // Filter all used parameters
    const result = auctions.filter(function(e) {
        return attribs.every(function(a) {
            return values.includes(e[a.toLowerCase()]);
        })
    })
    console.log(result);

    res.status( result ? StatusCodes.OK : StatusCodes.BAD_REQUEST).send(result ? result : "Yup, this didn't work as expected, I’m probably not the best person to ask for that information.")
})






module.exports = router;