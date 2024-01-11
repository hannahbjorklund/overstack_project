import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlayerCard from '../PlayerCard/PlayerCard';

export default function RemoveFriendPage(){
    const user = useSelector(store => store.user.userReducer);
    const friendAccounts = useSelector(store => store.blizzard.friendAccounts);
    const statsArray = useSelector((store) => store.stats.statSummaryArray);
    const [filterOption, setFilterOption] = useState('recent');

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getFriendAccounts();
    }, [filterOption]);

    useEffect(() => {
        getStatSummaryArray();
    }, [friendAccounts]);

    function getFriendAccounts() {
        console.log(filterOption);
        dispatch({
            type: 'GET_FRIEND_ACCOUNTS',
            payload: {id: user.id, filter: filterOption}
        })
    }

    function getStatSummaryArray() {
        let blizzArray = [];
        friendAccounts.map((x) => {
          blizzArray.push({battletag: x.battletag, id: x.blizzard_account_id});
        });
        dispatch({
          type: "GET_STAT_SUMMARY_ARRAY",
          payload: blizzArray,
        });
    }

    function handleChange(e){
        setFilterOption(e.target.value);
    }

    return (
        <div className = 'container'>
            <h1 className = 'title'>Friends</h1>
            <div className = 'friendBox'>
                <div className = 'filterBar'>
                    <label>Filter: </label>
                    <select value={filterOption} onChange = {handleChange} className = 'heroSelect'>
                        {/* These values can be inserted into a GET query to re-order friends */}
                        <option value={`recent`}> Recent </option>
                        <option value={`alph`}> Alphabetical (A-Z) </option>
                        <option value={`revAlph`}> Reverse Alphabetical (Z-A)</option>
                    </select>
                    <div className = 'moarButtons'>
                        <button className='btnDisabled' onClick = {() => history.push('/addFriend')} disabled = {true}>Add Friend</button>
                        <button className='btn' onClick = {() => history.push('/myFriends')}>Cancel</button>
                        <span className = 'removeMessage'>Click an account to remove</span>
                    </div>
                </div>
                <div className = 'friendAccounts'>
                    {
                        statsArray &&
                        statsArray.map((x, i) => {
                          return <PlayerCard key={i} stats={x} />;
                        })
                    }
                </div>
            </div>
        </div>
    )
}
