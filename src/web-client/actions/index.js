export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_TO_CART = 'ADD_TO_CART';

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

export const addToCart = async ({productId}) => ({
    type: ADD_TO_CART,
    payload: {productId}
});