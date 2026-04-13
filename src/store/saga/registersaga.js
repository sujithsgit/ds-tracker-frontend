import { call, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { axiosPostNoAuth } from "../../utils/common/axios";

// ================= REGISTER =================
export function* registerEffectSaga(action) {
  const { name, email, password } = action?.data?.payload;

  try {
    const { data, status } = yield call(() =>
      axiosPostNoAuth(`auth/register`, {
        name: name,
        email: email,
        password: password,
      })
    );

    if (status === 200) {
      console.log("REGISTER RESPONSE:", data);
      action.data?.callback?.success?.(data);
    }
  } catch (e) {
    console.log(e);

    // 🔥 callback failure
    action.data?.callback?.failure?.(e);
  }
}

export function* registerWatcherSaga() {
  yield takeLatest(types.REGISTER_USER, registerEffectSaga);
}