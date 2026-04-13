import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {axiosPostNoAuth,} from "../../utils/common/axios";


export function* loginEffectSaga(action) {
  const { username, password } = action?.data?.payload;
  try {
    const { data, status } = yield call(() =>
      axiosPostNoAuth(`auth/login`, { 
        username: username,  // ← backend LoginRequest.getUsername() இதை படிக்கும்
        password: password 
      })
    );

    if (status === 200) {
      console.log("data", data);
      localStorage.setItem("token", data.token);        // ← access token
      localStorage.setItem("refreshToken", data.refreshToken); // ← refresh token
      action.data?.callback?.success?.(data);
    }
  } catch (e) {
    console.log(e);
    action.data?.callback?.failure?.(e);
  }
}


export function* generateTokenWatcherSaga() {
  yield takeLatest(types.CREATE_AUTH, loginEffectSaga);
}
