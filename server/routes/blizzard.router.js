const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Add a new blizzard account to the database
router.post('/', (req, res) => {
    let battletag = req.body.battletag;
    let userID = req.body.userID;
    
    // Returning "id" will give us back the id of the added blizzard account
    const addAccountQuery = `
        INSERT INTO "blizzard_accounts" 
        ("battletag", "user_id")
        VALUES
        ($1, $2)
        RETURNING "id";
    `

    const addAccountValues = [battletag, userID];

    // First query to add the account to the DB
    pool.query(addAccountQuery, addAccountValues)
    .then((result) => {
        const addedAccountID = result.rows[0].id;
        console.log('Added blizz account ID:', addedAccountID);

        // Now we have to insert values into our junction table, user_accounts
        //  in order to designate a user that owns the blizzard account
        const addAccountUserQuery = `
            INSERT INTO "user_accounts"
            ("blizzard_account_id", "user_id")
            VALUES
            ($1, $2);
        `

        const addAccountUserValues = [addedAccountID, userID];

        // Second query
        pool.query(addAccountUserQuery, addAccountUserValues)
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in second POST query:', error);
            res.sendStatus(500);
        })
    }).catch((error) => {
        console.log('Error in first POST query:', error);
        res.sendStatus(500);
    })
})

module.exports = router;