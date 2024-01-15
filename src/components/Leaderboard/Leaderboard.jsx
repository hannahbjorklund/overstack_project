import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Leaderboard.css';

export default function Leaderboard(){
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.userReducer);
    const allAccounts = useSelector((store) => store.blizzard.allAccounts);
    const allStatsArray = useSelector((store) => store.stats.allStatsArray);

    useEffect(() => {
        getAllAccounts();
    }, []);
    
    useEffect(() => {
        getAllStatsArray();
    }, [allAccounts]);

    useEffect(() => {
        getBestLeaderboard();
    }, [allStatsArray])

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
    
    function getBestLeaderboard(){
        dispatch({
            type: 'GET_BEST_LEADERBOARD',
            payload: allStatsArray
        })
    }

    return (
        <table>

        </table>
    )
}