import { call, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { axiosPostNoAuth } from "../../utils/common/axios";
export function* verifyOtpEffectSaga(action) {
  const { email, otp } = action?.data?.payload;

  try {
    const { data, status } = yield call(() =>
      axiosPostNoAuth(`auth/verify-otp`, {
        email: email,
        otp: otp,
      })
    );

    if (status === 200) {
      console.log("VERIFY OTP RESPONSE:", data);
      action.data?.callback?.success?.(data);
    }
  } catch (e) {
    console.log(e);
    action.data?.callback?.failure?.(e);
  }
}

export function* verifyOtpWatcherSaga() {
  yield takeLatest(types.VERIFY_OTP, verifyOtpEffectSaga);
}