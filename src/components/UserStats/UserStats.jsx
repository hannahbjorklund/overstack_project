import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './UserStats.css';

export default function UserStats(){
    const user = useSelector((store) => store.user.userReducer);
    const compiledStats = useSelector((store) => store.stats.compiledStats);
    const [currentContent, setCurrentContent] = useState("Total");

    const openTab = (e, tabID) => {
        e.preventDefault();
        setCurrentContent(tabID);
    }

    return (
        <div className='container'>
            <h1>Stats for {user.username} </h1>
            <div className='tabBox'>
                <div className='buttonBar'>
                    <button className='btn' onClick={(e) => openTab(e, 'Total')}>Total</button>
                    <button className='btn' onClick={(e) => openTab(e, 'Comp')}>Competitive</button>
                </div>
                {
                    (currentContent == 'Total') &&
                    <div id='Total' className='tabContent'>
                        Total
                    </div>
                }
                {
                    (currentContent == 'Comp') &&
                    <div id='Comp' className='tabContent'>
                        Competitive
                    </div>

                }
            </div>
        </div>
    )
}