import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

    console.log(playerSummary);

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

    return (
        <div className = 'container'>
            <h1 className='title'>Overview for {params.player}</h1>
            <div className='overviewBox'>

            </div>
        </div>
    )
}