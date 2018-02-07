import {CREATE_PRODUCT, LOAD_PRODUCT_LIST} from '@/web-client/actions';

const initialState = [
    {
        name: 'Shampoo',
        id: 0,
        description: 'This product lets you clean your hair.',
        price: 5.77,
    },
    {
        name: 'Cutting Board',
        id: 1,
        description: 'This product lets you cut food with a knife.',
        price: 40.43,
    },
    {
        name: 'Tea',
        id: 2,
        description: 'Something to drink.',
        price: 16.80,
    },
];

const productList = (state = initialState, {type, payload}) => {
    if (type === LOAD_PRODUCT_LIST)
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

export default productList;