import {
    LOGIN,
    LOGOUT,
    ADD_TO_CART
} from '@/web-client/actions';

const user = (state = null, {type, payload}) => {
    if (type === LOGIN) {
        return {
            name: payload.name,
        };
    } else if (type === LOGOUT) {
        return null;
    }
    return state;
};

const productList = (state = [
    {
        name: 'Shampoo',
        id: 0,
        description: 'This product lets you clean your hair.',
        price: 5.77
    },
    {
        name: 'Cutting Board',
        id: 1,
        description: 'This product lets you cut food with a knife.',
        price: 40.43
    },
    {
        name: 'Tea',
        id: 2,
        description: 'Something to drink.',
        price: 16.80
    },
], action) => {
    return state;
};

const cart = (state = {}, {type, payload}) => {
    if (type === ADD_TO_CART) {
        const amount = state[payload.productId] || 0;
        return {
            ...state,
            [payload.productId]: amount + 1,
        };
    }
    return state;
};

export default (state = {}, action) => ({
    user: user(state.user, action),
    productList: productList(state.productList, action),
    cart: cart(state.cart, action),
});