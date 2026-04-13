import { combineReducers } from "@reduxjs/toolkit";
import resolutionReducer from "./resolutionreducer";
import dashboardReducer from "./dashboard";
 // ✅ add this

const rootReducer = combineReducers({
    resolution: resolutionReducer,
      dashboard: dashboardReducer,
});

export default rootReducer;