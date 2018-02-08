import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    LOAD_ADMIN_PRODUCT_LIST
} from '@/web-client/actions/admin';

const initialState = [];

const adminProductList = (state = initialState, {type, payload}) => {
    if (type === LOAD_ADMIN_PRODUCT_LIST)
    {
        return Array.isArray(payload) ? payload : state;
    } else if (type === CREATE_PRODUCT)
    {
        const _state = Array.from(state);
        _state.push(payload);
        return _state;
    } else if (type === UPDATE_PRODUCT)
    {
        const _state = Array.from(state);
        const product = _state.find(product => product.id === payload.id);
        Object.assign(product, payload);
        return _state;
    } else if (type === DELETE_PRODUCT)
    {
        const _state = Array.from(state);
        return _state.filter(product => product.id !== payload.id);
    }
    return state;
};

export default adminProductList;