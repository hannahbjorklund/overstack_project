import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard';
import './MyFriends.css';

export default function MyFriends(){
    const user = useSelector(store => store.user.userReducer);
    const [filterOption, setFilterOption] = useState(`"id" DESC`);

    const dispatch = useDispatch();

    useEffect(() => {
        getFriendAccounts();
    }, []);

    function getFriendAccounts() {
        dispatch({
            type: 'GET_FRIEND_ACCOUNTS',
            payload: {id: user.id, filter: filterOption}
        })
    }

    return (
        <div className = 'container'>
            <h1 className = 'title'>Friends</h1>
            <div className = 'friendBox'>
                <div className = 'filterBar'>
                    <label>Filter: </label>
                    <select value={filterOption} onChange = {(e) => setFilterOption(e.target.value)} className = 'heroSelect'>
                        {/* These values can be inserted into a GET query to re-order friends */}
                        <option value={`"id" DESC`}> Recent </option>
                        <option value={`"battletag"`}> Alphabetical (A-Z) </option>
                        <option value={`"battletag" DESC`}> Reverse Alphabetical (Z-A)</option>
                    </select>
                </div>
                <div className = 'friendAccounts'>

                </div>
            </div>
        </div>
    )
}
