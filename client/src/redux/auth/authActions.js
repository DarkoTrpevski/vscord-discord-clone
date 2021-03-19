import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, USER_LOADING, AUTH_SUCCESS, LOGOUT } from './authActionTypes';
import { setAlert } from '../alert/alertActions';
import setAuthToken from '../../utils/setAuthToken';
import api from '../../utils/api';

export const loadCurrentUser = () => async(dispatch) => {

  const URL = "/auth/me";
  console.log('Inside loadUser localStorage.token is: ', localStorage.token);  
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }
  
  try {
    const res = await api.get(URL);
    console.log('Inside loadUser response is : ', res);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

export const registerUser = (username, email, password) => async(dispatch) => {

  //**TESTING */
  //**TESTING */
  //**TESTING */
  //**TESTING */
  //**TESTING */
  dispatch({ type: USER_LOADING })

  const URL = '/auth/register';
  const newUser = {
    name: username,
    email: email,
    password: password
  }

  try {
    const body = JSON.stringify(newUser);
    const res = await api.post(URL, body);
    console.log('Inside registerUser, response data is: ', res.data);   
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadCurrentUser());
  } catch (err) {

    console.log('Error message is: ', err);
    if(err.response) {
      const errors = err.response.data.errors;
      if(errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'))
        })
      }
    }
    dispatch({ type: REGISTER_FAIL });
    throw err;

  }
};

export const loginUser = (email, password) => async(dispatch) => {

  //**TESTING */
  //**TESTING */
  //**TESTING */
  //**TESTING */
  //**TESTING */
  dispatch({ type: USER_LOADING })
  
  const URL = '/auth/login';
  const user = {
    email: email,
    password: password
  }
  console.log('Inside loginUser action, API is: ', api);

  try {
    const body = JSON.stringify(user);
    const res = await api.post(URL, body);
    console.log('Inside loginUser action, response data is: ', res.data);   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadCurrentUser());

  } catch (err) {

    console.log('Error message is: ', err);
    if(err.response) {
      const errors = err.response.data.errors;
      if(errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'))
        })
      }
    }
    dispatch({ type: LOGIN_FAIL });
    throw err;

  }
};

export const logout = () => async(dispatch) => {
  console.log('Inside authActions, logout action');
  dispatch({ type: LOGOUT })
}