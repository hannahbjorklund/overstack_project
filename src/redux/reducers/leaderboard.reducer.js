import { combineReducers } from "redux";

const bestLeaderboard = (state = {}, action) => {
    switch (action.type) {
        case "SET_BEST_LEADERBOARD":
          return action.payload;
        default:
          return state;
    }
}

export default combineReducers({
    bestLeaderboard
});