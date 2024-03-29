import { combineReducers } from "redux";

// Store the user's linked blizzard accounts
const userAccounts = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_ACCOUNTS":
      return action.payload;
    default:
      return state;
  }
};

// Store the user's friended accounts
const friendAccounts = (state = [], action) => {
  switch(action.type) {
    case "SET_FRIEND_ACCOUNTS":
      return action.payload;
    default:
      return state;
  }
}

// Store all accounts (a user's stack)
const allAccounts = (state = [], action) => {
  switch(action.type) {
    case "SET_ALL_ACCOUNTS":
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  userAccounts,
  friendAccounts,
  allAccounts
});
