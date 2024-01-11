import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StatsPanel from "../StatsPanel/StatsPanel";
import './AccountStats.css';

export default function AccountStats(){
    const params = useParams();
    const dispatch = useDispatch();

    const playerSummary = useSelector((store) => store.stats.accountSummary)
    const playerStats = useSelector((store) => store.stats.allPlayerStats);

    useEffect(() => {
        getAllPlayerStats();
        getAccountSummary();
      }, []);

    function getAccountSummary(){
        dispatch({
            type: "GET_ACCOUNT_SUMMARY",
            payload: `${params.player}`,
        });
    };

    function getAllPlayerStats(){
        dispatch({
            type: 'GET_ALL_PLAYER_STATS',
            payload: [`${params.player}`]
        })
    }

    const myStyle = {
        backgroundImage: `url(${playerSummary.namecard})`,
        backgroundSize: "cover",
    };

    return (
        <div className = 'container'>
            <h1 className='title'> Account Overview </h1>
            <div className='overviewBox'>
                {
                    playerSummary.endorsement &&
                    <div className = 'topBox'>

                        <div className = 'playerHeader' style = {myStyle}>
                            <img className = 'icon' src={`${playerSummary.avatar}`}></img>
                            <h1 className = 'playerTag'> {params.player} </h1>
                            <img className = 'e-icon' src={`${playerSummary.endorsement.frame}`}></img>
                        </div>
                        
                        <div className = 'rankBar'>
                            <h1 className='playerTitle'>{playerSummary.title}</h1>
                            <div className = 'comp'>
                            {
                                playerSummary.competitive &&
                                <>
                                    {
                                        playerSummary.competitive.pc.tank && 
                                        <>
                                            <img className = 'roleIcon' src={`${playerSummary.competitive.pc.tank.role_icon}`}></img>
                                            <img className = 'rankIcon' src={`${playerSummary.competitive.pc.tank.rank_icon}`}></img>
                                        </>
                                    }
                                    {
                                        playerSummary.competitive.pc.damage &&
                                        <>
                                            <img className = 'roleIcon' src={`${playerSummary.competitive.pc.damage.role_icon}`}></img>
                                            <img className = 'rankIcon' src={`${playerSummary.competitive.pc.damage.rank_icon}`}></img>
                                        </>
                                    }
                                    {
                                        playerSummary.competitive.pc.support &&
                                        <>
                                            <img className = 'roleIcon' src={`${playerSummary.competitive.pc.support.role_icon}`}></img>
                                            <img className = 'rankIcon' src={`${playerSummary.competitive.pc.support.rank_icon}`}></img>
                                        </>
                                    }
                                </>
                            }
                            </div>
                        </div>
                    </div>
                }
                <br/>
                <div className = 'box'>
                    {
                        playerStats.total && <StatsPanel compiledStats = {{competitive: playerStats.competitive.all_heroes,
                        quickplay: playerStats.quickplay.all_heroes, total: playerStats.total.all_heroes}} totalStats={playerStats} privacy={playerSummary.privacy}/>
                    }
                    {
                        playerSummary.privacy == 'private' &&
                        <h1 className='error'>Could not get stats, this account is private</h1>
                    }
                </div>
            </div>
        </div>
    )
}