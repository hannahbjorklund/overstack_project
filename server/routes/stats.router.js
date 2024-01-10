const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const axios = require("axios");

// Given a battletag, query the API for that player's stats summary
router.get("/summary", rejectUnauthenticated, (req, res) => {
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
      let allStats = { battletag: tag };

      // DATA FORMATTING.
      //  There is a possibility a user won't have stats
      //  This often happens with new users or users that have created an
      //  account but haven't played. As a result, check stats
      if (response.data.stats) {
        // Store the raw stats object
        const rawStats = response.data.stats.pc;

        // Initialize two empty objects we wish to add to allStats
        let qpGame = {};
        let qpCombat = {};

        // Store the corresponding raw objects we wish to reformat
        let qpGameRaw = rawStats.quickplay.career_stats["all-heroes"][2].stats;
        let qpCombatRaw =
          rawStats.quickplay.career_stats["all-heroes"][3].stats;

        // Populate new objects with reformatted data
        for (let stat of qpGameRaw) {
          qpGame[stat.key] = stat.value;
        }
        for (let stat of qpCombatRaw) {
          qpCombat[stat.key] = stat.value;
        }

        // Assemble the quickplay property
        allStats.quickplay = {
          all_heroes: {
            game: qpGame,
            combat: qpCombat,
          },
          heroes: [],
        };

        // Adding top 3 heroes stats to quickplay
        for (let i = 0; i < 3; i++) {
          // Grab hero
          let hero =
            rawStats.quickplay.heroes_comparisons.time_played.values[i].hero;
          allStats.quickplay.heroes.push({
            name: hero,
            game: [],
          });

          // Populating more stats for top 3 heroes
          // Hero specific stats
          allStats.quickplay.heroes[i][
            rawStats.quickplay.career_stats[hero][0].category
          ] = rawStats.quickplay.career_stats[hero][0].stats;

          // Doing this data manually because of some repeat values in the API result
          let qpGamePath = rawStats.quickplay.career_stats[hero][3].stats;
        
          allStats.quickplay.heroes[i].game.push({label: qpGamePath[0].label, value: Math.floor(qpGamePath[0].value/60/60)});
          allStats.quickplay.heroes[i].game.push({label: qpGamePath[1].label, value: qpGamePath[1].value});
          allStats.quickplay.heroes[i].game.push({label: qpGamePath[2].label, value: qpGamePath[2].value});
          allStats.quickplay.heroes[i].game.push({label: qpGamePath[qpGamePath.length - 1].label, value: qpGamePath[qpGamePath.length - 1].value});
          allStats.quickplay.heroes[i].game.push({label: qpGamePath[qpGamePath.length - 2].label, value: qpGamePath[qpGamePath.length - 2].value});

          // Combat stats
          allStats.quickplay.heroes[i][
            rawStats.quickplay.career_stats[hero][4].category
          ] = rawStats.quickplay.career_stats[hero][4].stats;
        }

        // Repeat the same process for competitive stats
        let compGame = {};
        let compCombat = {};

        let compGameRaw =
          rawStats.competitive.career_stats["all-heroes"][2].stats;
        let compCombatRaw =
          rawStats.competitive.career_stats["all-heroes"][3].stats;

        for (let stat of compGameRaw) {
          compGame[stat.key] = stat.value;
        }
        for (let stat of compCombatRaw) {
          compCombat[stat.key] = stat.value;
        }

        qpCombat.healing_done =
          rawStats.quickplay.career_stats["all-heroes"][4].stats[1].value;
        compCombat.healing_done =
          rawStats.competitive.career_stats["all-heroes"][4].stats[1].value;
        qpCombat.assists =
          rawStats.quickplay.career_stats["all-heroes"][4].stats[3].value;
        compCombat.assists =
          rawStats.competitive.career_stats["all-heroes"][4].stats[3].value;

        allStats.competitive = {
          all_heroes: {
            game: compGame,
            combat: compCombat,
          },
          heroes: [],
        };

        // Adding in top 3 comp heroes
        // Adding top 3 heroes stats to quickplay
        for (let i = 0; i < 3; i++) {
          // Grab hero
          let hero =
            rawStats.competitive.heroes_comparisons.time_played.values[i].hero;
          allStats.competitive.heroes.push({
            name: hero,
            time_played:
              rawStats.competitive.heroes_comparisons.time_played.values[i]
                .value,
            game: []
          });
          
          // Populating more stats for top 3 heroes
          // Hero specific stats
          allStats.competitive.heroes[i][
            rawStats.competitive.career_stats[hero][0].category
          ] = rawStats.competitive.career_stats[hero][0].stats;

          // Game stats
          // Doing this data manually because of some repeat values in the API result
          let compGamePath = rawStats.competitive.career_stats[hero][3].stats;
          
          allStats.competitive.heroes[i].game.push({label: compGamePath[0].label, value: Math.floor(compGamePath[0].value/60/60)});
          allStats.competitive.heroes[i].game.push({label: compGamePath[1].label, value: compGamePath[1].value});
          allStats.competitive.heroes[i].game.push({label: compGamePath[2].label, value: compGamePath[2].value});
          allStats.competitive.heroes[i].game.push({label: compGamePath[compGamePath.length - 1].label, value: compGamePath[compGamePath.length - 1].value});
          allStats.competitive.heroes[i].game.push({label: compGamePath[compGamePath.length - 2].label, value: compGamePath[compGamePath.length - 2].value});

          // Combat stats
          allStats.competitive.heroes[i][
            rawStats.competitive.career_stats[hero][4].category
          ] = rawStats.competitive.career_stats[hero][4].stats;
        }

        // Making a new property to store total states, aka
        //  quickplay + competitive for each category

        // Adding game stats first
        let totalGame = {};
        for (let property in qpGame) {
          totalGame[property] = qpGame[property] + compGame[property];
        }

        // Adding combat stats
        let totalCombat = {};
        for (let property in qpCombat) {
          totalCombat[property] = qpCombat[property] + compCombat[property];
        }

        allStats.total = {
          all_heroes: {
            game: totalGame,
            combat: totalCombat,
          },
        };
      }
      res.send(allStats);
    })
    .catch((error) => {
      console.log("Error in GET:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
