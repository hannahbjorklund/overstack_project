import { combineReducers } from "redux";

const userReducer = (state = {}, action) => {
  console.log("userReducer accessed:", action.payload);
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const users = (state = [], action) => {
  console.log("users reducer accessed");
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  userReducer,
  users
});
