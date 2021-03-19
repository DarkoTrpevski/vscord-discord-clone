import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './alertTypes';

//alertType: "error" | "success" | "warning" | "info"
  export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
    try {
      const id = uuidv4();
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
      });
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    } catch (err) {
      console.log(err.message);
    }
};

  export const removeAlert = (id) => (dispatch) => {
  try {
    dispatch({ type: REMOVE_ALERT, payload: id })
  } catch (err) {
    console.log(err.message);
  }
};