import { combineReducers } from 'redux';

// A reducer to store a single account summary retrieved from the API
const accountSummary = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ACCOUNT_SUMMARY':
        console.log("Setting account summary reducer:", action.payload);
        return action.payload;
      default:
        return state;
    }
}

// Store an array of account summaries
const statSummaryArray = (state = [], action) => {
    switch (action.type) {
      case 'SET_STAT_SUMMARY_ARRAY':
        return action.payload;
      default:
        return state;
    }
}

// Store an array of more stats objects retrieved from the API
const allStatsArray = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_STATS_ARRAY':
        return action.payload;
      default:
        return state;
    }
}

export default combineReducers({
    accountSummary,
    statSummaryArray,
    allStatsArray
});