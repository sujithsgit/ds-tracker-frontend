import { call, put, takeLatest } from "redux-saga/effects"; 
import * as types from "../actions/actionTypes";
import { axiosGet } from "../../utils/common/axios";

export function* fetchDashboardEffectSaga(action) {
    try {
        yield put({ type: 'FETCH_DASHBOARD_REQUEST' }); 

        const { data, status } = yield call(() =>
            axiosGet("dashboard")
        );

        if (status === 200) {
            yield put({ type: 'FETCH_DASHBOARD_SUCCESS', payload: data });
            action.data?.callback?.success?.(data);
        }
    } catch (e) {
        yield put({ type: 'FETCH_DASHBOARD_FAILURE', payload: e }); 
        action.data?.callback?.failure?.(e);
    }
}

export function* dashboardWatcherSaga() {
    yield takeLatest(types.FETCH_DASHBOARD, fetchDashboardEffectSaga);
}