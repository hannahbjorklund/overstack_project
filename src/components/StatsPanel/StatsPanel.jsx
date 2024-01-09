import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeroPanel from '../HeroPanel/HeroPanel';

export default function StatsPanel({compiledStats, totalStats}){
    const [currentContent, setCurrentContent] = useState("Total");
    const history = useHistory();

    const openTab = (e, tabID) => {
        e.preventDefault();
        setCurrentContent(tabID);
    }

    return (
            <div className = 'statPanel'>
                <div className='buttonBar'>
                    <button className='btn' onClick={(e) => openTab(e, 'Total')}>Total</button>
                    <button className='btn' onClick={(e) => openTab(e, 'QP')}>Quickplay</button>
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
                                    <p>Assists: {compiledStats.total.combat.assists}</p>
                                    <p>Deaths: {compiledStats.total.combat.deaths}</p>
                                    <p>Objective Time: {Math.floor(compiledStats.total.combat.objective_time/60/60)} hours</p>
                                    <p>Objective Contest Time: {Math.floor(compiledStats.total.combat.objective_contest_time/60/60)} hours</p>
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
                                    <p>Assists: {compiledStats.competitive.combat.assists}</p>
                                    <p>Deaths: {compiledStats.competitive.combat.deaths}</p>
                                    <p>Objective Time: {Math.floor(compiledStats.competitive.combat.objective_time/60/60)} hours</p>
                                    <p>Objective Contest Time: {Math.floor(compiledStats.competitive.combat.objective_contest_time/60/60)} hours</p>
                                </div>
                                {
                                    history.location.pathname != '/userStats' &&
                                    <div className = 'heroBox'>
                                        <h3 className='category'>Top 3 Heroes</h3>
                                        <HeroPanel category = {'competitive'} stats={totalStats}/>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                }

                {
                    (currentContent == 'QP') &&
                    <div id='QP' className='tabContent'>
                        <h2>Quickplay Stats</h2>
                        {compiledStats.quickplay && 
                            <div className='statsBox'>
                                <div className='gameStats'>
                                    <h3 className='category'>Game</h3>
                                    <p>Time played: {Math.floor(compiledStats.quickplay.game.time_played/60/60)} hours</p>
                                    <p>Games played: {compiledStats.quickplay.game.games_played}</p>
                                    <p>Games won: {compiledStats.quickplay.game.games_won}</p>
                                    <p>Games lost: {compiledStats.quickplay.game.games_lost}</p>
                                    <p>Win percentage: {Math.floor(100*(compiledStats.quickplay.game.games_won)/(compiledStats.quickplay.game.games_played))}%</p>
                                </div>
                                <div className='combatStats'>
                                    <h3 className='category'>Combat</h3>
                                    <p>Damage Done: {compiledStats.quickplay.combat.damage_done}</p>
                                    <p>Eliminations: {compiledStats.quickplay.combat.eliminations}</p>
                                    <p>Final Blows: {compiledStats.quickplay.combat.final_blows}</p>
                                    <p>Melee Final Blows: {compiledStats.quickplay.combat.melee_final_blows}</p>
                                    <p>Environmental Kills: {compiledStats.quickplay.combat.environmental_kills}</p>
                                    <p>Healing Done: {compiledStats.quickplay.combat.healing_done}</p>
                                    <p>Assists: {compiledStats.quickplay.combat.assists}</p>
                                    <p>Deaths: {compiledStats.quickplay.combat.deaths}</p>
                                    <p>Objective Time: {Math.floor(compiledStats.quickplay.combat.objective_time/60/60)} hours</p>
                                    <p>Objective Contest Time: {Math.floor(compiledStats.quickplay.combat.objective_contest_time/60/60)} hours</p>
                                </div>
                                {
                                    history.location.pathname != '/userStats' &&
                                    <div className = 'heroBox'>
                                        <h3 className='category'>Top 3 Heroes</h3>
                                        <HeroPanel category = {'quickplay'} stats={totalStats}/>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                }
            </div>
        )
}