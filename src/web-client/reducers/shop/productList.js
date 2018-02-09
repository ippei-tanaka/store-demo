import {
    LOAD_PRODUCT_LIST
} from '@/web-client/actions/constants';

const initialState = [];

const productList = (state = initialState, {type, payload}) => {
    if (type === LOAD_PRODUCT_LIST)
    {
        return Array.isArray(payload) ? payload : [];
    }
    return state;
};

export default productList;