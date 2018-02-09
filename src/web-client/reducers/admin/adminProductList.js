import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    LOAD_ADMIN_PRODUCT_LIST,
} from '@/web-client/actions/constants';

import _ from 'lodash/fp';

const pickProductFields = _.pick([
    'id', 'name', 'price', 'description', 'image',
]);

const processProductList = _.flow([
    _.filter(_.isPlainObject),
    _.uniqBy('id'),
    _.map(pickProductFields),
]);

const productListProcessor = (defaultValue) => _.cond([
    [_.negate(_.isArray), _.constant(defaultValue)],
    [_.stubTrue, processProductList],
]);

const addNewProductTo = (array) => _.flow([
    pickProductFields,
    _.concat(array)
]);

const updateProductOf = (array) => (newProduct) => {
    const index = _.findIndex(p => p.id === newProduct.id)(array);
    return _.update(index, p => pickProductFields(Object.assign({}, p, newProduct)), array);
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
        return _.filter(p => p.id !== payload.id)(state);
    }
    return state;
};

export default adminProductList;