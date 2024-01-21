import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MyStack.css";
import Leaderboard from '../Leaderboard/Leaderboard';

export default function MyStack() {
  const user = useSelector((store) => store.user.userReducer);
  const allAccounts = useSelector((store) => store.blizzard.allAccounts);
  const allStatsArray = useSelector((store) => store.stats.allStatsArray);
  const compiledStats = useSelector((store) => store.stats.compiledStats);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    getAllStatsArray();
  }, [allAccounts]);

  useEffect(() => {
    compileStats();
  }, [allStatsArray]);

  function getAllAccounts() {
    dispatch({
      type: "GET_ALL_ACCOUNTS",
      payload: user.id,
    });
  }

  function getAllStatsArray() {
    let blizzArray = [];
    allAccounts.map((x) => {
      blizzArray.push({ battletag: x.battletag, id: x.blizzard_account_id });
    });
    dispatch({
      type: "GET_ALL_STATS_ARRAY",
      payload: blizzArray,
    });
  }

  function compileStats() {
    dispatch({
      type: "COMPILE_STATS",
      payload: allStatsArray,
    });
  }

  return (
    <div className="container">
      <h1 className="title"> My Stack </h1>
      <div className="stackContainer">
        <div className="stackBox">
            <div className="overView">
              {compiledStats.total &&
                <h1 className = 'getALife'> Your stack has played for {Math.round(compiledStats.total.game.time_played/60/60)} hours </h1>
              }
            </div>
            <div className = 'statsBody'>
              {compiledStats.total &&
                <div className = 'gameCombatBox'>
                  <h2 className = 'category'> Game </h2>
                  <p> Games played: {compiledStats.total.game.games_played} </p>
                  <p> Games W/L: {compiledStats.total.game.games_won}/{compiledStats.total.game.games_lost} </p>
                  <p> Avg Win Percentage: {Math.round(compiledStats.total.game.games_won*100/compiledStats.total.game.games_played)}% </p>
                  
                  <h2 className = 'category'> Combat </h2>
                  <p> Damage Done: {compiledStats.total.combat.damage_done} </p>
                  <p>Eliminations: {compiledStats.total.combat.eliminations}</p>
                  <p>Final Blows: {compiledStats.total.combat.final_blows}</p>
                  <p>Melee Final Blows: {compiledStats.total.combat.melee_final_blows}</p>
                  <p>Environmental Kills: {compiledStats.total.combat.environmental_kills}</p>
                  <p>Healing Done: {compiledStats.total.combat.healing_done}</p>
                  <p>Assists: {compiledStats.total.combat.assists}</p>
                  <p>Deaths: {compiledStats.total.combat.deaths}</p>
                  <p>Objective Time: {Math.round(compiledStats.total.combat.objective_time/60/60)} hours</p>
                  <p>Objective Contest Time: {Math.round(compiledStats.total.combat.objective_contest_time/60/60)} hours</p>
                </div>
              }
              
              <Leaderboard/>
              
            </div>
        </div>
        <div className = 'stackMembers'>
            <h1 className = 'membersHeader'> Members </h1>
            <div className = 'stackList'>
                {
                    allAccounts && allAccounts.map((x, i) => {
                        return <p className = 'singleMember' key={i} onClick = {() => history.push(`/accountStats/${x.battletag}`)}>{x.battletag}</p>
                    })
                }
            </div>
        </div>
      </div>
    </div>
  );
}
