import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Add a new blizzard account to the user's stack or linked accounts
function* addUserAccount(action){
    try {
        const newAccount = action.payload;
        if(newAccount.battletag == '-'){
            alert("Sorry, an error occurred. Please refresh the page and try again");
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
        let friendAccountsResponse = yield axios.get(`blizzard/friends/${userID}`);;
        // Different get routes depending on the user selected filter
        if (filter == 'alph'){
            friendAccountsResponse = yield axios.get(`blizzard/friends/alph/${userID}`);
        } else if (filter == 'revAlph'){
            friendAccountsResponse = yield axios.get(`/blizzard/friends/revAlph/${userID}`);
        }
        // Set friendAccounts reducer
        yield put({
            type: 'SET_FRIEND_ACCOUNTS',
            payload: friendAccountsResponse.data
        })
    } catch (error) {
        console.log('Error in getFriendAccounts:', error);
    }
}

// Add a new blizzard account as a friend
function* addFriendAccount(action){
    try {
        const newAccount = action.payload;
        if(newAccount.battletag == '-'){
            alert("Sorry, an error occurred. Please refresh the page and try again");
        } else {
            // POST request
            const response = yield axios({
                method: 'POST',
                url: '/blizzard/friends',
                data: newAccount
            })
            yield put({
              type: 'GET_USER_ACCOUNTS'
            })
            alert(`Success! Added ${newAccount.battletag} as a friend`);
        }
        } catch (error){
            alert("An error occurred. Try again, or check the FAQ for help");
            console.log("Error in addAccount:", error);
        }
}

// Remove an account from friends list
function* removeFriend(action){
    try{
        let blizzardID = action.payload;
        // Delete by battletag. This is acceptable since battletag is a unique value
        const response = yield axios({
            method: 'DELETE',
            url: `/blizzard/friends/${blizzardID}`,
        })
    } catch (error) {
        console.log("Error in removeAccount:", error);
    }
}

function* getAllAccounts(action){
    try{
        let userID = action.payload;
        const allAccountsResponse = yield axios.get(`/blizzard/all/${userID}`);
        yield put({
            type: 'SET_ALL_ACCOUNTS',
            payload: allAccountsResponse.data
        })
    } catch (error){
        console.log('Error in getAllAccounts:', error);
    }
}

export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
    yield takeEvery('GET_USER_ACCOUNTS', getUserAccounts);
    yield takeLatest('REMOVE_ACCOUNT', removeAccount);
    yield takeLatest('GET_FRIEND_ACCOUNTS', getFriendAccounts);
    yield takeLatest('ADD_FRIEND_ACCOUNT', addFriendAccount);
    yield takeLatest('REMOVE_FRIEND', removeFriend);
    yield takeLatest('GET_ALL_ACCOUNTS', getAllAccounts);
}