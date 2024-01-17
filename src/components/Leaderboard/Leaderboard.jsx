import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Leaderboard.css';

export default function Leaderboard(){
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.userReducer);
    const allAccounts = useSelector((store) => store.blizzard.allAccounts);
    const allStatsArray = useSelector((store) => store.stats.allStatsArray);
    const leaderboard = useSelector((store) => store.leaderboard.bestLeaderboard);

    const [currentLeaderboard, setCurrentLeaderboard] = useState('qp');

    // useEffect(() => {
    //     getAllAccounts();
    // }, []);
    
    // useEffect(() => {
    //     getAllStatsArray();
    // }, [allAccounts]);

    useEffect(() => {
        getBestLeaderboard();
    }, [allStatsArray])

    // function getAllAccounts() {
    //     dispatch({
    //       type: "GET_ALL_ACCOUNTS",
    //       payload: user.id,
    //     });
    // }
    
    // function getAllStatsArray() {
    //     let blizzArray = [];
    //     allAccounts.map((x) => {
    //         blizzArray.push({ battletag: x.battletag, id: x.blizzard_account_id });
    //     });
    //     dispatch({
    //         type: "GET_ALL_STATS_ARRAY",
    //         payload: blizzArray,
    //     });
    // }
    
    function getBestLeaderboard(){
        dispatch({
            type: 'GET_BEST_LEADERBOARD',
            payload: allStatsArray
        })
    }

    const openTab = (e, tabID) => {
        e.preventDefault();
        setCurrentLeaderboard(tabID);
    }

    return (
        <div className = 'leaderboardBox'>
            <button onClick = {(e) => openTab(e, 'qp')} className = 'btn'>Quickplay</button>
            <button onClick = {(e) => openTab(e, 'comp')} className = 'btn'>Competitive</button>
            {
                (currentLeaderboard == 'qp') &&
                <table className = 'leaderboardTable'>
                    {leaderboard.quickplay && 
                        <tbody>
                            {leaderboard.quickplay.assists_avg_per_10_min &&
                            <tr>
                                <td>Assists</td>
                                <td>{leaderboard.quickplay.assists_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.assists_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.deaths_avg_per_10_min &&
                            <tr>
                                <td>Deaths</td>
                                <td>{leaderboard.quickplay.deaths_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.deaths_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.eliminations_avg_per_10_min &&
                            <tr>
                                <td>Eliminations</td>
                                <td>{leaderboard.quickplay.eliminations_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.eliminations_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.final_blows_avg_per_10_min &&
                            <tr>
                                <td>Final Blows</td>
                                <td>{leaderboard.quickplay.final_blows_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.final_blows_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.healing_done_avg_per_10_min &&
                            <tr>
                                <td>Healing Done</td>
                                <td>{leaderboard.quickplay.healing_done_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.healing_done_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.hero_damage_done_avg_per_10_min &&
                            <tr>
                                <td>Damage Done</td>
                                <td>{leaderboard.quickplay.hero_damage_done_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.hero_damage_done_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.objective_kills_avg_per_10_min &&
                            <tr>
                                <td>Objective Kills</td>
                                <td>{leaderboard.quickplay.objective_kills_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.objective_kills_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.quickplay.solo_kills_avg_per_10_min &&
                            <tr>
                                <td>Solo Kills</td>
                                <td>{leaderboard.quickplay.solo_kills_avg_per_10_min.name}</td>
                                <td>{leaderboard.quickplay.solo_kills_avg_per_10_min.value}</td>
                            </tr>
                            }   
                        </tbody>
                        }
                </table>
            }

            {
                (currentLeaderboard == 'comp') &&
                <table className = 'leaderboardTable'>
                    {leaderboard.competitive && 
                        <tbody>
                            {leaderboard.competitive.assists_avg_per_10_min &&
                            <tr>
                                <td>Assists</td>
                                <td>{leaderboard.competitive.assists_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.assists_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.deaths_avg_per_10_min &&
                            <tr>
                                <td>Deaths</td>
                                <td>{leaderboard.competitive.deaths_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.deaths_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.eliminations_avg_per_10_min &&
                            <tr>
                                <td>Eliminations</td>
                                <td>{leaderboard.competitive.eliminations_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.eliminations_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.final_blows_avg_per_10_min &&
                            <tr>
                                <td>Final Blows</td>
                                <td>{leaderboard.competitive.final_blows_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.final_blows_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.healing_done_avg_per_10_min &&
                            <tr>
                                <td>Healing Done</td>
                                <td>{leaderboard.competitive.healing_done_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.healing_done_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.hero_damage_done_avg_per_10_min &&
                            <tr>
                                <td>Damage Done</td>
                                <td>{leaderboard.competitive.hero_damage_done_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.hero_damage_done_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.objective_kills_avg_per_10_min &&
                            <tr>
                                <td>Objective Kills</td>
                                <td>{leaderboard.competitive.objective_kills_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.objective_kills_avg_per_10_min.value}</td>
                            </tr>
                            }
                            {leaderboard.competitive.solo_kills_avg_per_10_min &&
                            <tr>
                                <td>Solo Kills</td>
                                <td>{leaderboard.competitive.solo_kills_avg_per_10_min.name}</td>
                                <td>{leaderboard.competitive.solo_kills_avg_per_10_min.value}</td>
                            </tr>
                            }   
                        </tbody>
                        }
                </table>
            }
        </div>
    )
}