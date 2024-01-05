const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Given a battletag, query the API for that player's stats summary
router.get('/summary', (req, res) => {
    const tag= req.query.tag;
    axios({
        method: 'GET',
        url: `https://overfast-api.tekrop.fr/players/${tag}/summary`
    }).then((response) => {
        // Adding the battletag to the object, just for convenience
        response.data.battletag = tag;
        res.send(response.data);
    }).catch((error) => {
        console.log('Error in GET:', error);
        res.sendStatus(500);
    })
})

module.exports = router;