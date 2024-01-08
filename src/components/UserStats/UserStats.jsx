import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './UserStats.css';

export default function UserStats(){
    const user = useSelector((store) => store.user.userReducer);
    const compiledStats = useSelector((store) => store.stats.compiledStats);
    const userAccounts = useSelector((store) => store.blizzard.userAccounts);
    const allStatsArray = useSelector((store) => store.stats.allStatsArray);
    const [currentContent, setCurrentContent] = useState("Total");
    const [currentHero, setCurrentHero] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        getUserAccounts();
    }, []);

    // Ensure userAccounts has been populated before getting all stats
    useEffect(() => {
        getAllStatsArray();
    }, [userAccounts]);

    useEffect(() => {
        compileStats();
    }, [allStatsArray]);

    // Get a list of the user's linked accounts by dispatching
    function getUserAccounts() {
        dispatch({
        type: "GET_USER_ACCOUNTS",
        payload: user.id,
        });
    }

    // Grab more stats, some of which will be displayed in the user info section
    function getAllStatsArray() {
        let blizzArray = [];
        userAccounts.map((x) => {
        blizzArray.push({battletag: x.battletag, id: x.blizzard_account_id});
        });
        dispatch({
        type: "GET_ALL_STATS_ARRAY",
        payload: blizzArray,
        });
    }

    function compileStats() {
        dispatch({
        type: 'COMPILE_STATS',
        payload: allStatsArray
        })
    }
        
    const openTab = (e, tabID) => {
            e.preventDefault();
            setCurrentContent(tabID);
    }

    return (
        <div className='container'>
            <h1>Stats for {user.username} </h1>
            <div className='tabBox'>
                <div className='buttonBar'>
                    <button className='btn' onClick={(e) => openTab(e, 'Total')}>Total</button>
                    <button className='btn' onClick={(e) => openTab(e, 'Comp')}>Competitive</button>
                </div>
                {
                    (currentContent == 'Total') &&
                    <div id='Total' className='tabContent'>
                        <h2>Total Stats</h2>
                        {compiledStats.total && 
                            <div className='statsBox'>
                                <div className='gameStats'>
                                    <h3 className='category'>Game</h3>
                                    <p>Time played: {Math.floor(compiledStats.total.game.time_played/60/60)} hours</p>
                                    <p>Games played: {compiledStats.total.game.games_played}</p>
                                    <p>Games won: {compiledStats.total.game.games_won}</p>
                                    <p>Games lost: {compiledStats.total.game.games_lost}</p>
                                    <p>Win percentage: {Math.floor(100*(compiledStats.total.game.games_won)/(compiledStats.total.game.games_played))}%</p>
                                </div>
                                <div className='combatStats'>
                                    <h3 className='category'>Combat</h3>
                                    <p>Damage Done: {compiledStats.total.combat.damage_done}</p>
                                    <p>Eliminations: {compiledStats.total.combat.eliminations}</p>
                                    <p>Final Blows: {compiledStats.total.combat.final_blows}</p>
                                    <p>Melee Final Blows: {compiledStats.total.combat.melee_final_blows}</p>
                                    <p>Environmental Kills: {compiledStats.total.combat.environmental_kills}</p>
                                    <p>Healing Done: {compiledStats.total.combat.healing_done}</p>
                                    <p>Deaths: {compiledStats.total.combat.deaths}</p>
                                    <p>Objective Time: {Math.floor(compiledStats.total.combat.objective_time/60/60)} hours</p>
                                    <p>Objective Contest Time: {Math.floor(compiledStats.total.combat.objective_contest_time/60/60)} hours</p>
                                </div>
                                <div className='heroStats'>
                                    <h3 className='category'>Top 3 Heroes</h3>
                                    <select value={currentHero} onChange = {(e) => {setCurrentHero(e.target.value)}}>
                                        <option value='Kiriko'>Kiriko</option>
                                        <option value='Brig'>Brig</option>
                                        <option value='Ana'>Ana</option>
                                    </select>
                                    {
                                        (currentHero == 'Kiriko') && <p>Kiriko</p>
                                    }
                                    {
                                        (currentHero == 'Brig') && <p>Brig</p>
                                    }
                                    {
                                        (currentHero == 'Ana') && <p>Ana</p>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    (currentContent == 'Comp') &&
                    <div id='Comp' className='tabContent'>
                        <h2>Competitive Stats</h2>
                        {compiledStats.competitive && 
                            <div className='statsBox'>
                                <div className='gameStats'>
                                    <h3 className='category'>Game</h3>
                                    <p>Time played: {Math.floor(compiledStats.competitive.game.time_played/60/60)} hours</p>
                                    <p>Games played: {compiledStats.competitive.game.games_played}</p>
                                    <p>Games won: {compiledStats.competitive.game.games_won}</p>
                                    <p>Games lost: {compiledStats.competitive.game.games_lost}</p>
                                    <p>Win percentage: {Math.floor(100*(compiledStats.competitive.game.games_won)/(compiledStats.competitive.game.games_played))}%</p>
                                </div>
                                <div className='combatStats'>
                                    <h3 className='category'>Combat</h3>
                                    <p>Damage Done: {compiledStats.competitive.combat.damage_done}</p>
                                    <p>Eliminations: {compiledStats.competitive.combat.eliminations}</p>
                                    <p>Final Blows: {compiledStats.competitive.combat.final_blows}</p>
                                    <p>Melee Final Blows: {compiledStats.competitive.combat.melee_final_blows}</p>
                                    <p>Environmental Kills: {compiledStats.competitive.combat.environmental_kills}</p>
                                    <p>Healing Done: {compiledStats.competitive.combat.healing_done}</p>
                                    <p>Deaths: {compiledStats.competitive.combat.deaths}</p>
                                    <p>Objective Time: {Math.floor(compiledStats.competitive.combat.objective_time/60/60)} hours</p>
                                    <p>Objective Contest Time: {Math.floor(compiledStats.competitive.combat.objective_contest_time/60/60)} hours</p>
                                </div>
                                <div className='heroStats'>
                                    <h3 className='category'>Top 3 Heroes</h3>
                                    <select value={currentHero} onChange = {(e) => {setCurrentHero(e.target.value)}}>
                                        <option value='Kiriko'>Kiriko</option>
                                        <option value='Brig'>Brig</option>
                                        <option value='Ana'>Ana</option>
                                    </select>
                                    {
                                        (currentHero == 'Kiriko') && <p>Kiriko</p>
                                    }
                                    {
                                        (currentHero == 'Brig') && <p>Brig</p>
                                    }
                                    {
                                        (currentHero == 'Ana') && <p>Ana</p>
                                    }
                                </div>
                            </div>
                        }
                    </div>

                }
            </div>
        </div>
    )
}