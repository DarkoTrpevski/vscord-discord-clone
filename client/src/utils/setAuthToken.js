import api from './api';

const setAuthToken = (token) => {
  try {
    if(token) {
      console.log('Inside setAuthToken.js, there is a token, TOKEN is: ', token);
      api.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
      // api.defaults.headers.common['token'] = token;
      localStorage.setItem('token', token);
    } else {
      console.log('Inside setAuthToken.js, there is NOT a token, TOKEN is: ', token);
      delete api.defaults.headers.common['Authorization'];
      // delete api.defaults.headers.common['token'];
      localStorage.removeItem('token');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export default setAuthToken;