import { combineReducers } from 'redux';
import alertReducer from './alert/alertReducer';
import authReducer from './auth/authReducer';
// import serverReducer from "./serverReducer";

const rootReducer = combineReducers({
    alertReducer: alertReducer,
    authReducer: authReducer,
    // serverReducer: serverReducer,
});

export default rootReducer;