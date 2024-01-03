import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Add a new blizzard account to the user's stack or linked accounts
function* addUserAccount(action){
    try {
        const newAccount = action.payload;
        // POST request
        const response = yield axios({
            method: 'POST',
            url: '/blizzard',
            data: newAccount
        })
        // yield put({
        //   type: 'FETCH_USER_ACCOUNTS'
        // })
        alert(`Success! Linked ${newAccount.battletag} to your profile`);
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
    }
}

export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
    yield takeEvery('GET_USER_ACCOUNTS', getUserAccounts);
    yield takeLatest('GET_ACCOUNT_SUMMARY', getAccountSummary);
}