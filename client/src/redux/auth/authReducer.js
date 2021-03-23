import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, USER_LOADING, AUTH_ERROR, AUTH_SUCCESS, LOGOUT } from './authActionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    //TREBA DA GI ZAMENAM REGISTER_SUCCESS I LOGIN_SUCCESS SO AUTH_SUCCESS
    //TREBA DA GI ZAMENAM REGISTER_SUCCESS I LOGIN_SUCCESS SO AUTH_SUCCESS
    //TREBA DA GI ZAMENAM REGISTER_SUCCESS I LOGIN_SUCCESS SO AUTH_SUCCESS
    case AUTH_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log('Inside LOGIN_SUCCESS, payload is: ', payload);
      payload && payload.token && localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        token: payload?.token,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}

export default authReducer;