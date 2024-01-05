import { combineReducers } from 'redux';

// Store the user's linked blizzard accounts
const userAccounts = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ACCOUNTS':
        return action.payload;
      default:
        return state;
    }
};
  
export default combineReducers({
  userAccounts
});