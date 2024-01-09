import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './UserStats.css';
import StatsPanel from '../StatsPanel/StatsPanel';

export default function UserStats(){
    const user = useSelector((store) => store.user.userReducer);
    const compiledStats = useSelector((store) => store.stats.compiledStats);
    const userAccounts = useSelector((store) => store.blizzard.userAccounts);
    const allStatsArray = useSelector((store) => store.stats.allStatsArray);

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

    return (
        <div className='container'>
            <h1 className='title'>Stats for {user.username}</h1>
            <div className = 'tabBox'>
                {
                    compiledStats.total && <StatsPanel compiledStats = {compiledStats}/>
                }
                {userAccounts && 
                    <div className='accountBox'>
                        <h3 className='category'>Accounts Included in Calculations:</h3>
                        {userAccounts.map((x) => {
                            return <p key={x.id}>{x.battletag}</p>
                        })}
                    </div>
                }
            </div>
        </div>
    )
}