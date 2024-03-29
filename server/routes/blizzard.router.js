const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// Get the blizzard accounts owned by the given user
router.get("/:id", rejectUnauthenticated, (req, res) => {
  let userID = req.params.id;

  const sqlQuery = `
    SELECT "username",
	    "battletag",
      "blizzard_account_id"
	    FROM "users"
	    JOIN "user_accounts"
	    ON "users"."id" = "user_accounts"."user_id"
	    JOIN "blizzard_accounts"
	    ON "blizzard_accounts"."id" = "user_accounts"."blizzard_account_id"
        WHERE "users"."id" = $1;
    `;

  const sqlValues = [userID];

  pool
    .query(sqlQuery, sqlValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET /blizzard/:id:", error);
      res.sendStatus(500);
    });
});

// Get the blizzard accounts a user has added as a friend
router.get("/friends/:id", rejectUnauthenticated, (req, res) => {
  let userID = req.params.id;

  // Using order by blizzard account id will display friends list with most recently added friends on top
  const sqlQuery = `
    SELECT "battletag",
	    "user_accounts"."blizzard_account_id"
	    FROM "user_accounts"
	    JOIN "blizzard_accounts"
	      ON
	      "user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
	    JOIN "users"
	      ON
	      "users"."id" = "blizzard_accounts"."user_id"
	    WHERE "blizzard_accounts"."user_id" = $1 AND "user_accounts"."user_id" IS NULL
      ORDER BY "blizzard_accounts"."id" DESC;
  `

  const sqlValues = [userID];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /blizzard/friends/:id:", error);
      res.sendStatus(500);
    })
})

// Get all accounts added by a user, this includes their own accounts and friends accounts
router.get("/all/:id", rejectUnauthenticated, (req, res) => {
  let userID = req.params.id;
  const sqlQuery = `
    SELECT "battletag",
      "blizzard_accounts"."id" AS "blizzard_account_id"
    FROM "users"
    JOIN "blizzard_accounts"
      ON "users"."id" = "blizzard_accounts"."user_id"
    WHERE "users"."id" = $1;
  `;

  const sqlValues = [userID];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log("Error in GET /blizzard/all/:id:", error);
      res.sendStatus(500);
    })
})

 // Get blizzard friend accounts in alphabetical order
router.get("/friends/alph/:id", rejectUnauthenticated, (req, res) => {
  let userID = req.params.id;

  // Using order by blizzard account id will display friends list with most recently added friends on top
  const sqlQuery = `
    SELECT "battletag",
	    "user_accounts"."blizzard_account_id"
	    FROM "user_accounts"
	    JOIN "blizzard_accounts"
	      ON
	      "user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
	    JOIN "users"
	      ON
	      "users"."id" = "blizzard_accounts"."user_id"
	    WHERE "blizzard_accounts"."user_id" = $1 AND "user_accounts"."user_id" IS NULL
      ORDER BY "blizzard_accounts"."battletag";
  `

  const sqlValues = [userID];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /blizzard/friends/alph/:id:", error);
      res.sendStatus(500);
    })
})

// Get blizzard friend accounts in reverse alphabetical order
router.get("/friends/revAlph/:id", rejectUnauthenticated, (req, res) => {
  let userID = req.params.id;

  // Using order by blizzard account id will display friends list with most recently added friends on top
  const sqlQuery = `
    SELECT "battletag",
	    "user_accounts"."blizzard_account_id"
	    FROM "user_accounts"
	    JOIN "blizzard_accounts"
	      ON
	      "user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
	    JOIN "users"
	      ON
	      "users"."id" = "blizzard_accounts"."user_id"
	    WHERE "blizzard_accounts"."user_id" = $1 AND "user_accounts"."user_id" IS NULL
      ORDER BY "blizzard_accounts"."battletag" DESC;
  `

  const sqlValues = [userID];

  pool.query(sqlQuery, sqlValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in /blizzard/friends/alph/:id:", error);
      res.sendStatus(500);
    })
})

// Add a new user blizzard account to the database
router.post("/", rejectUnauthenticated, (req, res) => {
  let battletag = req.body.battletag;
  let userID = req.body.userID;

  // Returning "id" will give us back the id of the added blizzard account
  const addAccountQuery = `
        INSERT INTO "blizzard_accounts" 
        ("battletag", "user_id")
        VALUES
        ($1, $2)
        RETURNING "id";
    `;

  const addAccountValues = [battletag, userID];

  // First query to add the account to the DB
  pool
    .query(addAccountQuery, addAccountValues)
    .then((result) => {
      const addedAccountID = result.rows[0].id;

      // Now we have to insert values into our junction table, user_accounts
      //  in order to designate a user that owns the blizzard account
      const addAccountUserQuery = `
            INSERT INTO "user_accounts"
            ("blizzard_account_id", "user_id")
            VALUES
            ($1, $2);
        `;

      const addAccountUserValues = [addedAccountID, userID];

      // Second query
      pool
        .query(addAccountUserQuery, addAccountUserValues)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log("Error in second POST query:", error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log("Error in first POST query:", error);
      res.sendStatus(500);
    });
});

// Add a friend's blizzard account
router.post("/friends", rejectUnauthenticated, (req, res) => {
  let battletag = req.body.battletag;
  let userID = req.body.userID;

  // Returning "id" will give us back the id of the added blizzard account
  const addAccountQuery = `
        INSERT INTO "blizzard_accounts" 
        ("battletag", "user_id")
        VALUES
        ($1, $2)
        RETURNING "id";
    `;

  const addAccountValues = [battletag, userID];

  // First query to add the account to the DB
  pool
    .query(addAccountQuery, addAccountValues)
    .then((result) => {
      const addedAccountID = result.rows[0].id;

      // Now we have to insert values into our junction table, user_accounts
      //  User id will be NULL because this account is a friend,  not owned by the user
      const addAccountUserQuery = `
            INSERT INTO "user_accounts"
            ("blizzard_account_id", "user_id")
            VALUES
            ($1, NULL);
        `;

      const addAccountUserValues = [addedAccountID];

      // Second query
      pool
        .query(addAccountUserQuery, addAccountUserValues)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log("Error in second POST query:", error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log("Error in first POST query:", error);
      res.sendStatus(500);
    });
})

// Delete a user's linked blizzard account
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  let blizzardID = req.params.id;
  let userID = req.user.id;

  const sqlQuery = `
      DELETE FROM "user_accounts"
        WHERE "blizzard_account_id" = $1
        AND "user_id" = $2;
    `;

  const sqlValues = [blizzardID, userID];

  // Delete the blizzard account from the blizzard accounts table first
  pool
    .query(sqlQuery, sqlValues)
    .then((result) => {
      const sqlQuery2 = `
        DELETE FROM "blizzard_accounts"
            WHERE "id" = $1
            AND "user_id" = $2;
        `;

      // Delete the account from the junction table as well
      pool
        .query(sqlQuery2, sqlValues)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log("Error in second query in DELETE /blizzard/:id");
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log("Error in DELETE /blizzard/:id");
      res.sendStatus(500);
    });
});

// Delete a friend's blizzard account
router.delete("/friends/:id", rejectUnauthenticated, (req, res) => {
  let blizzardID = req.params.id;
  let userID = req.user.id;
  
  const sqlQuery = `
      DELETE FROM "user_accounts" 
	      USING "blizzard_accounts"
	    WHERE "user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
		    AND "user_accounts"."user_id" IS NULL
		    AND "blizzard_accounts"."id" = $1
        AND "blizzard_accounts"."user_id" = $2;
    `;

  const sqlValues = [blizzardID, userID];

  // First query to remove the account from the "user accounts" table
  pool.query(sqlQuery, sqlValues)
    .then((result) => {

      const sqlQuery2 = `
        DELETE FROM "blizzard_accounts"
        WHERE "blizzard_accounts"."id" = $1
          AND "blizzard_accounts"."user_id" = $2;
      `

      // Second query to remove the friend from the blizzard accounts table
      pool.query(sqlQuery2, sqlValues)
        .then((result) => {
          res.sendStatus(200);
        }).catch((error) => {
          console.log("Error in second query DELETE /blizzard/friends/:id:", error);
        })
    }).catch((error) => {
      console.log("Error in first query DELETE /blizzard/friends/:id:", error);
      res.sendStatus(500);
    })
})

module.exports = router;
