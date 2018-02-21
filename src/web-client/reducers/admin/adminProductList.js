import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    LOAD_ADMIN_PRODUCT_LIST,
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
    concat,
    findIndex,
    isArray,
    update
} from 'lodash/fp';

const pickProductFields = pick([
    'id', 'name', 'price', 'description', 'imageUrl',
]);

const processProductList = flow([
    filter(isPlainObject),
    uniqBy('id'),
    map(pickProductFields),
]);

const productListProcessor = (defaultValue) => cond([
    [negate(isArray), constant(defaultValue)],
    [stubTrue, processProductList],
]);

const addNewProductTo = (array) => flow([
    pickProductFields,
    concat(array)
]);

const updateProductOf = (array) => (newProduct) => {
    const index = findIndex(p => p.id === newProduct.id)(array);
    return update(index, p => pickProductFields(Object.assign({}, p, newProduct)), array);
};

const adminProductList = (state = [], {type, payload}) => {
    if (type === LOAD_ADMIN_PRODUCT_LIST) {
        return productListProcessor(state)(payload);
    }
    else if (type === CREATE_PRODUCT) {
        return addNewProductTo(state)(payload);
    } else if (type === UPDATE_PRODUCT) {
        return updateProductOf(state)(payload);
    } else if (type === DELETE_PRODUCT) {
        return filter(p => p.id !== payload.id)(state);
    }
    return state;
};

export default adminProductList;