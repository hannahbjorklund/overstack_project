import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Query the API for an account's summary stats given battletag
function* getAccountSummary(action){
    try{
        let battleTag = action.payload;
        const accountSummary = yield axios.get(`/stats/summary?tag=${battleTag}`);
        console.log("Got account summary:", accountSummary);
        // Set value of accountSummary reducer
        yield put({
            type: 'SET_ACCOUNT_SUMMARY',
            payload: accountSummary.data
        })
    } catch (error) {
        console.log("Error in getAccountSummary:", error);
        alert("An error occurred. Try again, or check the FAQ for help");
    }
}

// Query the API for an array of multiple battletags
function* getStatSummaryArray(action){
    try{
        let blizzardArray = action.payload;
        let statsArray = [];
        for(let i=0; i<blizzardArray.length; i++){
            const stats = yield axios.get(`/stats/summary?tag=${blizzardArray[i].battletag}`);
            // Adding blizzard account id for convenience
            stats.data.blizzardID = blizzardArray[i].id;
            statsArray.push(stats.data);
        }
        yield put({
            type: 'SET_STAT_SUMMARY_ARRAY',
            payload: statsArray
        })
    } catch (error) {
        console.log("Error in getStatsArray:", error);
    }
}

// Get a wide array of competitive and unranked stats for an array of battletags from the API
function* getAllStatsArray(action){
    try{
        let blizzardArray = action.payload;
        let allStatsArray = [];
        for(let i=0; i<blizzardArray.length; i++){
            const stats = yield axios.get(`/stats/all?tag=${blizzardArray[i].battletag}`);
            allStatsArray.push(stats.data);
        }
        yield put({
            type: 'SET_ALL_STATS_ARRAY',
            payload: allStatsArray
        })
    } catch (error) {
        console.log("Error in getStatsArray:", error);
    }
}

// Given an array of stats objects, find the cumulative stats for the group and bundle in a new object
function* compileStats(action){
    try{
        let statsArray = action.payload;
        let compiledGame = {};
        let compiledCombat = {};
        
        // For each object in the array
        for(let object of statsArray){
            if(object.total){
                // If statement will exclude profiles without stats from being added
                let totalGame = object.total.all_heroes.game;
                let totalCombat = object.total.all_heroes.combat;
                for(let property in totalGame){
                    if(compiledGame[property]){
                        compiledGame[property] += totalGame[property];
                    } else {
                        compiledGame[property] = totalGame[property];
                    }
                }
                for(let property in totalCombat){
                    if(compiledCombat[property]){
                        compiledCombat[property] += totalCombat[property];
                    } else {
                        compiledCombat[property] = totalCombat[property];
                    }
                }
            }
        }

        let compiledStats = {
            total: {
                game: compiledGame,
                combat: compiledCombat
            }
        }

        yield put({
            type: 'SET_COMPILED_STATS',
            payload: compiledStats
        })

    } catch (error) {
        console.log("Error in compileStats:", error);
    }
}

export default function* statsSaga() {
    yield takeLatest('GET_ACCOUNT_SUMMARY', getAccountSummary);
    yield takeLatest('GET_STAT_SUMMARY_ARRAY', getStatSummaryArray);
    yield takeLatest('GET_ALL_STATS_ARRAY', getAllStatsArray);
    yield takeLatest('COMPILE_STATS', compileStats);
}