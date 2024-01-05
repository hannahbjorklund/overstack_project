const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log("in GET /user");
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log("In /user/register POST");
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log("in /user/login POST")
  res.sendStatus(200);
});

// When a user logs in, update their last online value
router.put('/login/:id', (req, res) => {
  const userToUpdate = req.params.id;
  
  // Can user username in where statement because it is unique
  const sqlQuery = `
  UPDATE "users"
    SET "last_online" = NOW()
    WHERE "username" = $1;
  `
  const sqlValues = [userToUpdate];

  pool.query(sqlQuery, sqlValues)
  .then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log("Error in PUT /api/user/login/:id:", error);
  })
})

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  console.log("in /user/logout POST")
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
