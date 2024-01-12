const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Get a list of all users if the user is authenticated and an admin
router.get("/all", rejectUnauthenticated, (req, res) => {
  console.log("In /api/user/all");
  if (req.user.is_admin) {
    const sqlQuery = `
      SELECT * FROM "users"
        ORDER BY "id";
    `;

    pool
      .query(sqlQuery)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error in GET /api/user/all:", error);
        res.sendStatus(500);
      });
  }
});

// Allow an admin to delete a user
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const userID = req.params.id;
  if (req.user.is_admin) {
    console.log("query 1")
    const sqlQuery = `
      DELETE FROM "user_accounts" 
        USING "blizzard_accounts"
        WHERE "user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
          AND "blizzard_accounts"."user_id" = $2
          AND "user_accounts"."user_id" IS NOT NULL;`

    const sqlValues = [userID];

    pool.query(sqlQuery, sqlValues)
      .then((result) => {
      console.log("query 2")

        const sqlQuery2 = `
          DELETE FROM "blizzard_accounts"
            WHERE "user_id" = $1;
          `;

        pool.query(sqlQuery2, sqlValues)
          .then((result) => {
            console.log("query 3")

            const sqlQuery3 = `
            DELETE FROM "users"
              WHERE "id" = $1;
            `;

            pool.query(sqlQuery3, sqlValues)
              .then((result) => {
                res.sendStatus(201);
              }).catch((error) => {
                res.sendStatus(500);
              })
            
          }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
          })
        }).catch((error) => {
        console.log("Error in DELETE /api/user/:id:", error);
        res.sendStatus(500);
      });
  }
});

// Allow an admin to promote another user to admin
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const userID = req.params.id;
  if (req.user.is_admin) {
    const sqlQuery = `
      UPDATE "users"
        SET is_admin = NOT is_admin 
        WHERE "id" = $1;
    `;

    const sqlValues = [userID];

    pool
      .query(sqlQuery, sqlValues)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("Error in PUT /api/user/:id:", error);
        res.sendStatus(500);
      });
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  console.log("In /user/register POST");
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  console.log("in /user/login POST");
  res.sendStatus(200);
});

// When a user logs in, update their last online value
router.put("/login/:id", (req, res) => {
  console.log("In /api/user/login/:id");
  const userToUpdate = req.params.id;

  // Can user username in where statement because it is unique
  const sqlQuery = `
  UPDATE "users"
    SET "last_online" = NOW()
    WHERE "username" = $1;
  `;
  const sqlValues = [userToUpdate];

  pool
    .query(sqlQuery, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error in PUT /api/user/login/:id:", error);
    });
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  console.log("in /user/logout POST");
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
