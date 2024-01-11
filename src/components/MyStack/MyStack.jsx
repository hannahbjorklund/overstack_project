import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MyStack.css';

export default function MyStack(){
    const user = useSelector(store => store.user.userReducer);
    const allAccounts = useSelector(store => store.blizzard.allAccounts);
    const allStatsArray = useSelector((store) => store.stats.allStatsArray);
    const compiledStats = useSelector((store) => store.stats.compiledStats);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllAccounts();
    }, []);

    useEffect(() => {
        getAllStatsArray();
    }, [allAccounts]);

    useEffect(() => {
        compileStats();
    }, [allStatsArray]);

    function getAllAccounts(){
        dispatch({
            type: 'GET_ALL_ACCOUNTS',
            payload: user.id
        })
    }

    function getAllStatsArray() {
        let blizzArray = [];
        allAccounts.map((x) => {
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
        <div className = 'container'>
            <h1 className = 'title'>My Stack</h1>
            <div className = 'stackBox'>
                <div className = 'overView'>
                    
                </div>
            </div>
        </div>
    )
}