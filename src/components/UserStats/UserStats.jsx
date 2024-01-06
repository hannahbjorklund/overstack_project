import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './UserStats.css';

export default function UserStats(){
    const user = useSelector((store) => store.user);
    const compiledStats = useSelector((store) => store.stats.compiledStats);

    return (
        <div className='container'>
            <h1>Stats for {user.username} </h1>
        </div>
    )
}