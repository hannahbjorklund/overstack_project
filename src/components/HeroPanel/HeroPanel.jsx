import React, { useState } from 'react';
import './HeroPanel.css';

export default function HeroPanel({category, stats}){

    const [currentHero, setCurrentHero] = useState(`${stats[category].heroes[0].name}`);
    const [currentHeroStats, setCurrentHeroStats] = useState(stats[category].heroes[0]);

    const handleHeroChange = (e) => {
        setCurrentHero(e.target.value);
        let heroStats = stats[category].heroes.find((hero) => hero.name === e.target.value);
        setCurrentHeroStats(heroStats);
    }

    return (
        <div className='heroPanel'>
            <div className = 'heroPreview'>
                <select className = 'heroSelect' value = {currentHero} onChange = {handleHeroChange}>
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
                {currentHeroStats.game.map((x, i) => {
                    if(i == 0){
                        return <p key = {i}>{`${x.label}: ${x.value} hours`}</p>
                    } else {
                        return (
                            <p key = {i}>{`${x.label}: ${x.value}`}</p>
                        )
                    }
                })}
            </div>
            <div className = 'heroSpecStats'>
                
                {currentHeroStats.hero_specific.map((x, i) => {
                    return (
                        <p key = {i}>{`${x.label}: ${x.value}`}</p>
                    )
                })}
                
            </div>
        </div>
    )
}