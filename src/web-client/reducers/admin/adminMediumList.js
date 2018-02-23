import {
    LOAD_ADMIN_MEDIA_LIST,
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

const pickFields = pick([
    'id', 'type',
]);

const processList = flow([
    filter(isPlainObject),
    uniqBy('id'),
    map(pickFields),
]);

const listProcessor = (defaultValue) => cond([
    [negate(isArray), constant(defaultValue)],
    [stubTrue, processList],
]);

const list = (state = [], {type, payload}) => {
    if (type === LOAD_ADMIN_MEDIA_LIST) {
        return listProcessor(state)(payload);
    }
    return state;
};

export default list;