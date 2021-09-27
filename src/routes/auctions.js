const express = require('express');
const {StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in')
const isAdmin = require('../middleware/is-admin')
const auctions = require('../data/replicas')
const router = express.Router();

// Return auction list (auctions)
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
        if (replica.id === parseInt(req.params.id)) {
            exists = true;
            res
                .status(StatusCodes.OK)
                .send(replica);
        }
    }
    if (!exists) {
        res.status(StatusCodes.NOT_FOUND).send('Resource not found!');
    }
})


// Search by parameter
router.get('/search', (req,res)=> {

    const filter = req.query.name;
    const filteredList = [];
    for (let replica of auctions) {
        const str = replica.name;

        if (str.toLowerCase().includes(filter.toLowerCase())) {
            filteredList.push(replica);
        }
    }

    res.status(filteredList ? StatusCodes.OK : StatusCodes.NOTFOUND).send(filteredList ? filteredList : 'No results.');
})


// Filter the auction list with 3 different types of attributes
router.get('/filter', (req,res)=> {

    const attribs = [];

    for (let key in req.query)
        if (key != null)
            attribs.push(key);

    const values = [];
    for (let i = 0; attribs.length > i; i += 1){
        values.push(req.query[attribs[i]]);
    }

    // Filter all used parameters
    const result = auctions.filter(function(e) {
        return attribs.every(function(a) {
            return values.includes(e[a.toLowerCase()]);
        })
    })

    res.status( result ? StatusCodes.OK : StatusCodes.BAD_REQUEST).send(result ? result : "Yup, this didn't work as expected, I’m probably not the best person to ask for that information.")
})


// Retrieve all bids for single auction
router.get('/:id/bids', (req,res)=> {
    let bids = [];
    for (const replica of auctions) {
        if (replica.id === parseInt(req.params.id)) {
            for (const key in replica) {
                if (key === 'bids') {
                    for (let i = 0; i < replica[key].length; i++) {
                        bids.push(replica[key][i]);
                    }
                }
            }
        }
    }

    res.status(bids ? StatusCodes.OK : StatusCodes.NOT_FOUND).send(bids.length !== 0 ? bids : 'There are no bids for this auction.');
})

// Make bid
router.post('/:id/bids', (req,res)=>{

    const id = parseInt(req.params.id);
    const {user, bid} = req.body;
    let exists = false;
    for (const replica of auctions) {
        if (replica.id === id) {
            for (const key in replica) {
                if (key === 'bids') {
                    for (let i = 0; i < replica[key].length; i++){
                        // If bid exists do set exist to true
                        if (replica[key][i].user === user && replica[key][i].bid === bid)
                            exists = true;
                    }
                }
            }

            if (!exists) {
                auctions[id-1].bids.push(req.body);
                res.status(StatusCodes.OK).send(auctions[id-1]);
            }
            else{
                res.status(StatusCodes.NOT_ACCEPTABLE).send("You're so poor that I envy the people who haven't met you");
            }
        }
    }
})


module.exports = router;