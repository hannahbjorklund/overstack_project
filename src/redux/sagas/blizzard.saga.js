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

// Query the API for an account's summary stats given battletag
function* getAccountSummary(action){
    console.log("Inside getAccountSummary, action.payload:", action.payload);
    try{
        let battleTag = action.payload;
        const accountSummary = yield axios.get(`/statsSummary?tag=${battleTag}`);
        console.log("Got account summary:", accountSummary);
        // Set value of accountSummary reducer
        yield put({
            type: 'SET_ACCOUNT_SUMMARY',
            payload: accountSummary.data
        })
    } catch (error) {
        console.log("Error in getAccountSummary:", error);
        alert("An error occurred. Try again, or check the FAQ for help");
    }
}

// Query the API for an array of multiple battletags
function* getStatsArray(action){
    try{
        let battleTagArray = action.payload;
        let statsArray = [];
        for(let i=0; i<battleTagArray.length; i++){
            const stats = yield axios.get(`/statsSummary?tag=${battleTagArray[i]}`);
            statsArray.push(stats.data);
        }

        console.log("Got stats array:", statsArray);
        yield put({
            type: 'SET_STATS_ARRAY',
            payload: statsArray
        })
    } catch (error) {
        console.log("Error in getStatsArray:", error);
    }
}


export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
    yield takeEvery('GET_USER_ACCOUNTS', getUserAccounts);
    yield takeLatest('GET_ACCOUNT_SUMMARY', getAccountSummary);
    yield takeLatest('GET_STATS_ARRAY', getStatsArray);
}