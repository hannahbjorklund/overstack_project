import { put, takeLatest } from "redux-saga/effects";

function* getBestLeaderboard(action) {
  let statArray = action.payload;

  let leaderboardBest = {
    quickplay: {},
    competitive: {},
  };

  try {
    statArray.map((x, i) => {
      if (x.quickplay) {
        let playerAverage = x.quickplay.all_heroes.average;
        for (let object of playerAverage) {
          // Check to see if this property exists
          if (leaderboardBest.quickplay[object.key]) {
            // If the property exists, is the current value greater than the
            //  property's current value?
            if (object.value > leaderboardBest.quickplay[object.key].value) {
              // Update the value
              leaderboardBest.quickplay[object.key] = {
                name: x.battletag,
                value: object.value,
              };
            }
          } else {
            leaderboardBest.quickplay[object.key] = {
              name: x.battletag,
              value: object.value,
            };
          }
        }
      }
      if (x.competitive) {
        let playerAverageComp = x.competitive.all_heroes.average;
        for(let object of playerAverageComp) {
            if(leaderboardBest.competitive[object.key]) {
                if(object.value > leaderboardBest.competitive[object.key].value) {
                    leaderboardBest.competitive[object.key] = {
                        name: x.battletag,
                        value: object.value
                    };
                }
            } else {
                leaderboardBest.competitive[object.key] = {
                    name: x.battletag,
                    value: object.value
                }
            }
        }
      }
    });
    yield put({
        type: "SET_BEST_LEADERBOARD",
        payload: leaderboardBest,
    });
  } catch (error) {
    console.log("Error in getBestLeaderboard:", error);
  }
}

export default function* leaderboardSaga() {
  yield takeLatest("GET_BEST_LEADERBOARD", getBestLeaderboard);
}
