import {
    LOAD_ADMIN_USER_LIST,
} from '@/web-client/actions/constants';

import {
    pick,
    flow,
    isPlainObject,
    filter,
    uniqBy,
    map,
    cond,
    negate,
    constant,
    stubTrue,
    isArray,
} from 'lodash/fp';

const pickUserFields = pick([
    'id', 'name',
]);

const processUserList = flow([
    filter(isPlainObject),
    uniqBy('id'),
    map(pickUserFields),
]);

const userListProcessor = (defaultValue) => cond([
    [negate(isArray), constant(defaultValue)],
    [stubTrue, processUserList],
]);

const orderUserList = (state = [], {type, payload}) => {
    if (type === LOAD_ADMIN_USER_LIST) {
        return userListProcessor(state)(payload);
    }
    return state;
};

export default orderUserList;