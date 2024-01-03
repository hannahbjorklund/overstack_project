const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get the blizzard accounts owned by the given user 
router.get('/:id', (req, res) => {
    let userID = req.params.id;

    const sqlQuery = `
    SELECT "username",
	    "battletag"
	    FROM "users"
	    JOIN "user_accounts"
	    ON "users"."id" = "user_accounts"."user_id"
	    JOIN "blizzard_accounts"
	    ON "blizzard_accounts"."id" = "user_accounts"."blizzard_account_id"
        WHERE "users"."id" = $1;
    `

    const sqlValues = [userID];

    pool.query(sqlQuery, sqlValues)
    .then((result) => {
        console.log("Received some rows from the DB:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error in GET /blizzard/:id:", error);
        res.sendStatus(500);
    })
})

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