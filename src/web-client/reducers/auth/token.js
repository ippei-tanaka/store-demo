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
    flow,
    get,
    isString,
    identity
} from 'lodash/fp';

const initialState = null;

const tokenProcessor =
    flow([
        cond([
            [negate(isPlainObject), constant({})],
            [stubTrue, identity]
        ]),
        get('token'),
        cond([
            [negate(isString), constant(initialState)],
            [stubTrue, identity]
        ]),
    ]);

const token = (state = initialState, {type, payload}) => {
    if (type === AUTHENTICATE
        || type === VERIFY_TOKEN) {
        return tokenProcessor(payload);
    } else if (type === LOGOUT) {
        return initialState;
    }
    return state;
};

export default token;