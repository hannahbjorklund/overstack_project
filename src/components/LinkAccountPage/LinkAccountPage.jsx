import React, {useState} from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';
import './LinkAccountPage.css';
import { useSelector, useDispatch } from 'react-redux';

export default function LinkAccountPage(){
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [nameInput, setNameInput] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [battleTag, setBattleTag] = useState("");
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("In handleSubmit");
        console.log('Battletag:', battleTag);
        setNameInput("");
        setTagInput("");
    };

    const setCurrentBattleTag = () => {
        setBattleTag(`${nameInput}-${tagInput}`);
    }

    // Add the corresponding battletag to the blizzard_accounts table
    //  and link it to the user in the user_accounts table
    const addUserAccount = () => {
        const addedAccount = {
            battletag: battleTag, 
            userID: user.id
        };

        console.log('Adding this blizzard account to DB:', addedAccount);

        // Dispatch to addUserAccount in sagas
        dispatch({
            type: 'ADD_USER_ACCOUNT',
            payload: addedAccount
        });
    }

    return (
        <div className='cardContainer'>
            <h1>Link A Blizzard Account</h1>
            <form className='formPanel' onSubmit={handleSubmit}>
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
                <button onClick={setCurrentBattleTag} className='btn'>Search</button>
            </form>
            
            {/* Show a preview of the blizzard account's in-game profile */}
            <h2>Profile Preview:</h2>
            {battleTag && <PlayerCard battleTag={battleTag}/>}
            <button className='btn linkButton' onClick = {addUserAccount}>Link to My Account</button>
        </div>
    )
}