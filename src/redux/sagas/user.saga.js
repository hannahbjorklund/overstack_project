import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getUsers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/user/all', config);

    yield put({ type: 'SET_USERS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Allow an admin to delete a user acount
function* deleteUser(action) {
  let userID = action.payload;
  if(confirm(`Are you sure you want to delete user with ID ${userID}?`)){
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const response = yield axios.delete(`/api/user/${userID}`, config);
  
      yield put({ type: 'GET_USERS' });
    } catch (error) {
      console.log('User DELETE request failed', error);
    
    }
  }
}

// Allow an admin to promote or demote another user
function* updateUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    let userID = action.payload;
    const response = yield axios.put(`/api/user/${userID}`, config);

    yield put({ type: 'GET_USERS' });
  } catch (error) {
    console.log('User PUT request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('GET_USERS', getUsers);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('DELETE_USER', deleteUser);
}

export default userSaga;