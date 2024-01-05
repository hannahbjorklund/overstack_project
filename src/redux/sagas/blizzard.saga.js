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

// Query the API for an account's summary stats given battletag
function* getAccountSummary(action){
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
function* getStatSummaryArray(action){
    try{
        let blizzardArray = action.payload;
        let statsArray = [];
        for(let i=0; i<blizzardArray.length; i++){
            const stats = yield axios.get(`/statsSummary?tag=${blizzardArray[i].battletag}`);
            // Adding blizzard account id for convenience
            stats.data.blizzardID = blizzardArray[i].id;
            statsArray.push(stats.data);
        }
        yield put({
            type: 'SET_STAT_SUMMARY_ARRAY',
            payload: statsArray
        })
    } catch (error) {
        console.log("Error in getStatsArray:", error);
    }
}

function* removeAccount(action){
    console.log("Inside removeAccount, action.payload:", action.payload);
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

// Get a wide array of competitive and unranked stats for an array of battletags from the API
function* getAllStatsArray(action){
    try{
        let blizzardArray = action.payload;
        let allStatsArray = [];
        for(let i=0; i<blizzardArray.length; i++){
            const stats = yield axios.get(`/statsSummary?tag=${blizzardArray[i].battletag}`);
            allStatsArray.push(stats.data);
        }
        yield put({
            type: 'SET_ALL_STATS_ARRAY',
            payload: allStatsArray
        })
    } catch (error) {
        console.log("Error in getStatsArray:", error);
    }
}

export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
    yield takeEvery('GET_USER_ACCOUNTS', getUserAccounts);
    yield takeLatest('GET_ACCOUNT_SUMMARY', getAccountSummary);
    yield takeLatest('GET_STAT_SUMMARY_ARRAY', getStatSummaryArray);
    yield takeLatest('REMOVE_ACCOUNT', removeAccount);
    yield takeLatest('GET_ALL_STATS_ARRAY', getAllStatsArray);
}