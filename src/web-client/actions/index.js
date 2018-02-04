export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const login = async ({username, password}) => ({
    type: LOGIN,
    payload: {
        name: username,
    },
});

export const logout = async () => ({
    type: LOGOUT,
    payload: null,
});

export const addToCart = async ({productId, quantity}) => ({
    type: ADD_TO_CART,
    payload: {
        productId,
        quantity
    }
});

export const removeFromCart = async ({productId, quantity}) => ({
    type: REMOVE_FROM_CART,
    payload: {
        productId,
        quantity
    }
});