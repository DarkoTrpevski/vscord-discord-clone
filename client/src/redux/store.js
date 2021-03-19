import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
// import { persistStore } from "redux-persist";

// Load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const persistedState = loadState();

// const initialState = {};
const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(rootReducer, persistedState, composedEnhancers);

// Save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (error) {
        console.log(error);
    }
};

store.subscribe(() => {
  saveState({
    // auth: store.getState().auth,
    alertReducer: store.getState().alertReducer
  });
});

export default store;