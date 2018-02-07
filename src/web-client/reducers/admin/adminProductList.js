import {
    CREATE_PRODUCT,
    LOAD_ADMIN_PRODUCT_LIST
} from '@/web-client/actions/admin';

const initialState = [];

const adminProductList = (state = initialState, {type, payload}) => {
    if (type === LOAD_ADMIN_PRODUCT_LIST)
    {
        return payload;
    } else if (type === CREATE_PRODUCT)
    {
        const _state = Array.from(state);
        _state.push(payload);
        return _state;
    }
    return state;
};

export default adminProductList;