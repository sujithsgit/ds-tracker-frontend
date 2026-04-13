import { call, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { axiosPost } from "../../utils/common/axios";

export function* createResolutionEffectSaga(action) {
  const { payload } = action?.data;

  try {
    const { data, status } = yield call(() =>
      axiosPost("resolution/create", payload)
    );

    if (status === 200) {
      console.log("Resolution success:", data);
      action.data?.callback?.success?.(data);
    }

  } catch (e) {
    console.log(e);
    action.data?.callback?.failure?.(e);
  }
}

export function* resolutionWatcherSaga() {
  yield takeLatest(types.CREATE_RESOLUTION, createResolutionEffectSaga);
}