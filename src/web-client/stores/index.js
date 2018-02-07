import rootReducer from '../reducers';
//import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {createStore, applyMiddleware} from 'redux';
import {saveState, loadState} from '@/web-client/local-storage';
import throttle from 'lodash/throttle';
import loggerMiddleware from 'redux-logger';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        promiseMiddleware,
        //thunkMiddleware,
        loggerMiddleware
    ),
);

store.subscribe(throttle(() => {
    const state = store.getState();
    saveState(state);
}, 1000));

export default store;
