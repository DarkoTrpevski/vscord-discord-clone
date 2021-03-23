import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, USER_LOADING, AUTH_SUCCESS, LOGOUT } from './authActionTypes';
import { setAlert } from '../alert/alertActions';
import api from '../../utils/api';

export const loadCurrentUser = () => async (dispatch) => {

  const URL = "/auth/me";

  console.log('Inside loadCurrentUser localStorage.token is: ', localStorage.token);
  try {
    const res = await api.get(URL);
    console.log('Inside loadCurrentUser response data is : ', res.data);
    if(res.data.user) {
      const user = res.data.user;
      dispatch({ type: USER_LOADED, payload: user })
    }
  } catch (err) {
    console.log('Inside loadCurrentUser err is : ', err);
    console.log('Inside loadCurrentUser err.response is : ', err.response);
    dispatch({ type: AUTH_ERROR })
  }
}

export const registerUser = (username, email, password) => async (dispatch) => {

  dispatch({ type: USER_LOADING })

  const URL = '/auth/register';
  const user = {
    username: username,
    email: email,
    password: password
  }
  console.log('Inside registerUser action, API is: ', api);

  try {
    const body = JSON.stringify(user);
    const res = await api.post(URL, body);
    console.log('Inside registerUser action, response data is: ', res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    // dispatch(loadCurrentUser());

  } catch (err) {
    if (err.response) {
      const error = err.response.data;
      if (err.response.data) dispatch(setAlert(error.message, 'error'))
    }
    dispatch({ type: REGISTER_FAIL });
    throw err;
  }
};

export const loginUser = (email, password) => (dispatch) => {

  dispatch({ type: USER_LOADING })

  const URL = '/auth/login';
  const user = { email: email, password: password }
  const body = JSON.stringify(user);

  api.post(URL, body).then((res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadCurrentUser());
  }).catch((err) => {
    if (err.response) {
      const error = err.response.data;
      if(error) dispatch(setAlert(error.message, 'error'))
    }
    dispatch({ type: LOGIN_FAIL });
  })

};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
}