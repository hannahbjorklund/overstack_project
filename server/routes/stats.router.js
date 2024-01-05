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

        // DATA FORMATTING
      const rawStats = response.data.stats.pc;
    
      let allStats = {
        battletag: tag,
        quickplay: {
          all_heroes: {
            game: {
              time_played: rawStats.quickplay.career_stats['all-heroes'][2].stats[0].value,
              games_played: rawStats.quickplay.career_stats['all-heroes'][2].stats[1].value,
              games_won: rawStats.quickplay.career_stats['all-heroes'][2].stats[2].value,
              games_lost: rawStats.quickplay.career_stats['all-heroes'][2].stats[3].value
            },
            combat: {
              environmental_kills: rawStats.quickplay.career_stats['all-heroes'][3].stats[0].value,
              deaths: rawStats.quickplay.career_stats['all-heroes'][3].stats[1].value,
              final_blows: rawStats.quickplay.career_stats['all-heroes'][3].stats[3].value,
              objective_time: rawStats.quickplay.career_stats['all-heroes'][3].stats[4].value,
              eliminations:rawStats.quickplay.career_stats['all-heroes'][3].stats[7].value,
              objective_contest_time:rawStats.quickplay.career_stats['all-heroes'][3].stats[8].value,
              damage_done:rawStats.quickplay.career_stats['all-heroes'][3].stats[12].value,
              healing_done:rawStats.quickplay.career_stats['all-heroes'][4].stats[1].value
            }
          }
        },
        competitive: {
          all_heroes: {
            game: {
              time_played:rawStats.competitive.career_stats['all-heroes'][2].stats[0].value,
              games_played:rawStats.competitive.career_stats['all-heroes'][2].stats[1].value,
              games_won:rawStats.competitive.career_stats['all-heroes'][2].stats[2].value,
              games_tied:rawStats.competitive.career_stats['all-heroes'][2].stats[3].value,
              games_lost:rawStats.competitive.career_stats['all-heroes'][2].stats[4].value
            },
            combat: {
              environmental_kills:rawStats.competitive.career_stats['all-heroes'][3].stats[0].value,
              deaths: rawStats.competitive.career_stats['all-heroes'][3].stats[1].value,
              final_blows:rawStats.competitive.career_stats['all-heroes'][3].stats[3].value,
              objective_time:rawStats.competitive.career_stats['all-heroes'][3].stats[4].value,
              eliminations:rawStats.competitive.career_stats['all-heroes'][3].stats[7].value,
              objective_contest_time:rawStats.competitive.career_stats['all-heroes'][3].stats[8].value,
              damage_done:rawStats.competitive.career_stats['all-heroes'][3].stats[12].value,
              healing_done:rawStats.competitive.career_stats['all-heroes'][4].stats[1].value,
            }
          }
        }
      };

      res.send(allStats);
    })
    .catch((error) => {
      console.log("Error in GET:", error);
      res.sendStatus(500);
    });
});

module.exports = router;