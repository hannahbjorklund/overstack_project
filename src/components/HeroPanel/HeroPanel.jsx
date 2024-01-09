import React, { useState, useEffect } from 'react';
import './HeroPanel.css';

export default function HeroPanel({category, stats}){

    const [currentHero, setCurrentHero] = useState(`${stats[category].heroes[0].name}`);

    return (
        <div className='heroPanel'>
            <select className = 'heroSelect' value = {currentHero} onChange = {(e) => setCurrentHero(e.target.value)}>
                {
                    stats[category].heroes.map((x, i) => {
                        return (
                            <option key = {i} value={`${x.name}`}>{i+1}: {x.name}</option>
                        )
                    })
                }
            </select>
            <br/>
            <img className = 'heroIcon' src={`/hero_icons/${currentHero}.png`}/>
        </div>
    )
}