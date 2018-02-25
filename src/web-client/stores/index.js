import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {createStore, applyMiddleware} from 'redux';
import {saveState, loadState} from '@/web-client/local-storage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

let middleware = [promiseMiddleware, thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
    let loggerMiddleware = require('redux-logger');
    middleware = [...middleware, loggerMiddleware.default];
}

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middleware),
);

store.subscribe(throttle(() => {
    const state = store.getState();
    saveState({
        auth: {token: state.auth.token},
        shop: {cart: state.shop.cart}
    });
}, 1000));

export default store;
