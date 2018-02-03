import rootReducer from '../reducers';
//import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(
    rootReducer,
    applyMiddleware(
        promiseMiddleware,
        //thunkMiddleware,
        //loggerMiddleware // neat middleware that logs actions
    ),
);

export default store;
