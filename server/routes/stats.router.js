const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

// Given a battletag, query the API for that player's stats summary
router.get("/summary", (req, res) => {
  const tag = req.query.tag;
  axios({
    method: "GET",
    url: `https://overfast-api.tekrop.fr/players/${tag}/summary`,
  })
    .then((response) => {
      // Adding the battletag to the object, just for convenience
      response.data.battletag = tag;
      res.send(response.data);
    })
    .catch((error) => {
      console.log("Error in GET:", error);
      res.sendStatus(500);
    });
});

// Given a battletag, query the API for that player's in-depth total stats by gamemode
router.get("/all", (req, res) => {
  const tag = req.query.tag;
  axios({
    method: "GET",
    url: `https://overfast-api.tekrop.fr/players/${tag}`,
  })
    .then((response) => {
      // Initialize the new object we will send to the client
      let allStats = {battletag: tag}

      // DATA FORMATTING. 
      //  There is a possibility a user won't have stats
      //  This often happens with new users or users that have created an
      //  account but haven't played. As a result, check stats
      if(response.data.stats){
        // Store the raw stats object 
        const rawStats = response.data.stats.pc;
      
        // Initialize two empty objects we wish to add to allStats
        let qpGame = {};
        let qpCombat = {};

        // Store the corresponding raw objects we wish to reformat
        let qpGameRaw = rawStats.quickplay.career_stats['all-heroes'][2].stats;
        let qpCombatRaw = rawStats.quickplay.career_stats['all-heroes'][3].stats;

        // Populate new objects with reformatted data
        for(let stat of qpGameRaw){qpGame[stat.key] = stat.value;}
        for(let stat of qpCombatRaw){qpCombat[stat.key] = stat.value}

        // Assemble the quickplay property
        allStats.quickplay = {
          all_heroes: {
            game: qpGame,
            combat: qpCombat
          }
        }
        
        // Repeat the same process for competitive stats
        let compGame = {};
        let compCombat = {};
        
        let compGameRaw = rawStats.competitive.career_stats['all-heroes'][2].stats;
        let compCombatRaw = rawStats.competitive.career_stats['all-heroes'][3].stats;

        for(let stat of compGameRaw){compGame[stat.key] = stat.value;}
        for(let stat of compCombatRaw){compCombat[stat.key] = stat.value}

        compCombat.healing_done = rawStats.competitive.career_stats['all-heroes'][4].stats[1].value;

        allStats.competitive = {
          all_heroes: {
            game: compGame,
            combat: compCombat
          }
        }
      } 
      res.send(allStats);
    })
    .catch((error) => {
      console.log("Error in GET:", error);
      res.sendStatus(500);
    });
});

module.exports = router;