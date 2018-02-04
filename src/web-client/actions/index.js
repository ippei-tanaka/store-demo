import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const authenticate = async ({username, password}) => {
    const {data} = await fetch({
        path: '/auth',
        query: `
        mutation{
            authenticate(input:{username:"${username}",password:"${password}"}) {
              token
            }
        }
        `
    });
    return {
        type: AUTHENTICATE,
        payload: {
            token: data.authenticate.token,
        },
    };
};

export const logout = async () => ({
    type: LOGOUT,
    payload: null,
});

export const addToCart = async ({productId, quantity}) => ({
    type: ADD_TO_CART,
    payload: {
        productId,
        quantity,
    },
});

export const removeFromCart = async ({productId, quantity}) => ({
    type: REMOVE_FROM_CART,
    payload: {
        productId,
        quantity,
    },
});