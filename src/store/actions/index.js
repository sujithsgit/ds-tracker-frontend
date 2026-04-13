import * as types from "./actionTypes";



export const authUser = (data = {}) => ({
  type: types.CREATE_AUTH,
  data,
});

export const authUserResponse = (payload = {}) => ({
  type: types.AUTH_USER_RESPONSE,
  payload,
});


export const registerUser = (data = {}) => ({
  type: types.REGISTER_USER,
  data,
});

export const registerUserResponse = (payload = {}) => ({
  type: types.REGISTER_USER_RESPONSE,
  payload,
});


export const verifyOtp = (data = {}) => ({
  type: types.VERIFY_OTP,
  data,
});

export const verifyOtpResponse = (payload = {}) => ({
  type: types.VERIFY_OTP_RESPONSE,
  payload,
});

export const createResolution = (data = {}) => ({
  type: types.CREATE_RESOLUTION,
  data,
});

export const createResolutionResponse = (payload = {}) => ({
  type: types.CREATE_RESOLUTION_RESPONSE,
  payload,
});


export const fetchDashboard = (data) => ({
    type: types.FETCH_DASHBOARD,
    data,
});
export const checkIn = (data) => ({
    type: types.CHECK_IN,
    data,
});


const actions = {
  authUser,
  authUserResponse,
   registerUser,
  registerUserResponse,
  verifyOtp,
  verifyOtpResponse,
  createResolutionResponse,
  fetchDashboard,
};

export default actions;