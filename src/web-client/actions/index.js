import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const authenticate = async ({username, password}) => {
    const response = await fetch({
        path: '/auth',
        query: `
        mutation{
            authenticate(input:{username:"${username}",password:"${password}"}) {
              token
            }
        }
        `
    });
    return await verifyToken({
        token: response.data.authenticate.token
    });
};

export const verifyToken = async ({token}) => {
    const response = await fetch({
        path: '/auth',
        query: `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user { name, permissions } }
            }
        `
    });
    const {user, isValid} = response.data.verifyToken;
    const _user = {name: null, permissions: [], ...user};
    return {
        type: AUTHENTICATE,
        payload: {
            token: isValid ? token : null,
            name: _user.name,
            permissions: _user.permissions,
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