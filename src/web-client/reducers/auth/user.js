import {
    AUTHENTICATE,
    LOGOUT,
    VERIFY_TOKEN,
} from '@/web-client/actions/constants';

import {
    cond,
    constant,
    isPlainObject,
    negate,
    stubTrue,
    isString,
    identity,
    isEmpty,
    isArray,
} from 'lodash/fp';

const initialState = {
    name: null,
    permissions: [],
};

const nameProcessor = cond([
    [negate(isString), constant(initialState.name)],
    [isEmpty, constant(initialState.name)],
    [stubTrue, identity],
]);

const permissionProcessor = cond([
    [negate(isArray), constant(initialState.permissions)],
    [stubTrue, identity],
]);

const auth = (state = initialState, {type, payload}) => {
    if (type === AUTHENTICATE
        || type === VERIFY_TOKEN) {
        const {name, permissions} = isPlainObject(payload) ? payload : {};
        return {
            name: nameProcessor(name),
            permissions: permissionProcessor(permissions),
        };
    } else if (type === LOGOUT) {
        return initialState;
    }
    return state;
};

export default auth;