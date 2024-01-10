import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Add a new blizzard account to the user's stack or linked accounts
function* addUserAccount(action){
    try {
        const newAccount = action.payload;
        if(newAccount.battletag == '-'){
            alert("Sorry, an error occurred. Please try again");
        } else {
            // POST request
            const response = yield axios({
                method: 'POST',
                url: '/blizzard',
                data: newAccount
            })
            yield put({
              type: 'GET_USER_ACCOUNTS'
            })
            alert(`Success! Linked ${newAccount.battletag} to your profile`);
        }
        } catch (error){
            alert("An error occurred. Try again, or check the FAQ for help");
            console.log("Error in addAccount:", error);
        }
}

// Grab all of the user's personal blizzard accounts
function* getUserAccounts(action){
    try{
        // Get the user id
        let userID = action.payload;
        // Get the user accounts
        const userAccountsResponse = yield axios.get(`/blizzard/${userID}`);
        // Set value of userAccounts reducer
        yield put({
            type: 'SET_USER_ACCOUNTS',
            payload: userAccountsResponse.data
        })
    } catch (error){
        console.log('Error in getUserAccounts:', error);
    }
}

// Delete a blizzard account from the database
function* removeAccount(action){
    try{
        let blizzardID = action.payload;
        // Delete by battletag. This is acceptable since battletag is a unique value
        const response = yield axios({
            method: 'DELETE',
            url: `/blizzard/${blizzardID}`,
        })
    } catch (error) {
        console.log("Error in removeAccount:", error);
    }
}

// Get the user's friends blizzard accounts
function* getFriendAccounts(action){
    try{
        let userID = action.payload.id;
        let filter = action.payload.filter;
        const friendAccountsResponse = yield axios.get(`/blizzard/friends/${userID}?filter=${filter}`);
        // Set friendAccounts reducer
        yield put({
            type: 'SET_FRIEND_ACCOUNTS',
            payload: friendAccountsResponse.data
        })
    } catch (error) {
        console.log('Error in getFriendAccounts:', error);
    }
}

export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
    yield takeEvery('GET_USER_ACCOUNTS', getUserAccounts);
    yield takeLatest('REMOVE_ACCOUNT', removeAccount);
    yield takeLatest('GET_FRIEND_ACCOUNTS', getFriendAccounts);
}