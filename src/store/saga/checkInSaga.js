import { call, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { axiosPut } from "../../utils/common/axios";
export function* checkInEffectSaga(action) {
    try {
        const { resolutionId, status } = action.data.payload;

        const response = yield call(() =>
            axiosPut(`checkin/${resolutionId}`, { status }) // ✅ axiosPut
        );

        if (response?.data || response?.status === 200) {
            action.data?.callback?.success?.(response.data);
        }
    } catch (e) {
        console.log("checkin error:", e);
        action.data?.callback?.failure?.(e);
    }
}


export function* checkInWatcherSaga() {
    yield takeLatest(types.CHECK_IN, checkInEffectSaga);
}