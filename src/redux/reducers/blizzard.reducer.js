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

const accountSummary = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_SUMMARY':
      console.log("Setting account summary reducer:", action.payload);
      return action.payload;
    default:
      return state;
  }
}
  
// user will be on the redux state at:
// state.user
export default combineReducers({
  userAccounts,
  accountSummary,
});