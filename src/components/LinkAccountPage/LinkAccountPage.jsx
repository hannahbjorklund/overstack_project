import React, {useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import PlayerCard from '../PlayerCard/PlayerCard';

export default function LinkAccountPage(){
    const [stats, setStats] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [tagInput, setTagInput] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("In handleSubmit");
        console.log(`${nameInput}-${tagInput}`);
        getStats();
        setNameInput("");
        setTagInput("");
    };

    // Prompt the API for a specific blizzard battletag
    const getStats = () => {
        axios({
          method: "GET",
          url: `/ow?tag=${nameInput}-${tagInput}`,
        })
          .then((response) => {
            console.log("GOT a response from server:", response.data);
            setStats(response.data);
          })
          .catch((error) => {
            console.log("getStats fail:", error);
          });
    };
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    className="nameInput"
                    placeholder="Username"
                    onChange={(e) => {
                    setNameInput(e.target.value);
                    }}
                    value={nameInput}
                />
                <label>#</label>
                <input
                    className="tagInput"
                    placeholder="Tag"
                    onChange={(e) => {
                    setTagInput(e.target.value);
                    }}
                    value={tagInput}
                />
                <button className='btn'>Search</button>
            </form>
            
            {/* Show a preview of the blizzard account's in-game profile */}
            <PlayerCard stats={stats}/>
        </div>
    )
}