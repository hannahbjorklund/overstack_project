import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
        backgroundSize: "auto",
    };

    return (
        <div className = 'container'>
            <h1 className='title'> Account Overview </h1>
            <div className='overviewBox'>
                {
                    playerSummary &&
                    <div className = 'playerHeader' style = {myStyle}>
                        <img className = 'icon' src={`${playerSummary.avatar}`}></img>
                        <h1 className = 'playerTag'> {params.player} </h1>

                    </div>
                }
                <br/>
                <div className = 'box'>
                    {
                        playerStats.total && <StatsPanel compiledStats = {{competitive: playerStats.competitive.all_heroes,
                        quickplay: playerStats.quickplay.all_heroes, total: playerStats.total.all_heroes}}/>
                    }
                    <div className = 'heroBox'>
                        <h3 className='category'>Top 3 Heroes</h3>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}