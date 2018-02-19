import {
    LOAD_ADMIN_ORDER_LIST,
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

const pickProductFields = pick([
    'id', 'name', 'price', 'description', 'image',
]);

const processProductList = flow([
    filter(isPlainObject),
    uniqBy('id'),
    //map(pickProductFields),
]);

const orderListProcessor = (defaultValue) => cond([
    [negate(isArray), constant(defaultValue)],
    [stubTrue, processProductList],
]);

const orderProductList = (state = [], {type, payload}) => {
    if (type === LOAD_ADMIN_ORDER_LIST) {
        return orderListProcessor(state)(payload);
    }
    return state;
};

export default orderProductList;