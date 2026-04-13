


import { all } from "redux-saga/effects";
import { generateTokenWatcherSaga } from "./generate-tokenSaga";
import { registerWatcherSaga } from "./registersaga";
import { verifyOtpWatcherSaga } from "./otpSaga";
import { resolutionWatcherSaga } from "./resolutionsaga";
import { dashboardWatcherSaga } from "./dashboardSaga";
import { checkInWatcherSaga } from "./checkInSaga";



export default function* rootSaga() {
  yield all([
    generateTokenWatcherSaga(),
    registerWatcherSaga(),
    verifyOtpWatcherSaga(),
    resolutionWatcherSaga(),
    dashboardWatcherSaga(),
    checkInWatcherSaga(),
  ]);
}




