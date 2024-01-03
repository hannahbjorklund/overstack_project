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

// // Grab the user's linked blizzard accounts
// function* fetchUserAccounts(action){
//     try{
//         // Get the user id
//         let userID = action.payload;
//         // Get the user accounts
//         const userAccountsResponse = yield axios.get('/blizzard')
//     }
// }

export default function* blizzardSaga() {
    yield takeLatest('ADD_USER_ACCOUNT', addUserAccount);
}