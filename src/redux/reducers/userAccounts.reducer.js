// Store the user's linnkned blizzard accounnts
const userAccounts = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ACCOUNTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userAccounts;