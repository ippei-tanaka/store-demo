import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import store from '@/web-client/stores';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOAD_PRODUCT_LIST = 'LOAD_PRODUCT_LIST';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const authenticate = async ({username, password}) => {
    const response = await fetch({
        path: '/auth',
        query: `
        mutation{
            authenticate(input:{username:"${username}",password:"${password}"}) {
              token
            }
        }
        `,
    });
    return await verifyToken(response.data.authenticate.token);
};

export const verifyToken = async (token) => {
    const state = store.getState();
    const _token = token || state.user.token;
    const response = await fetch({
        path: '/auth',
        query: `
            query { 
                verifyToken (input: {token: "${_token}"})
                { isValid, user { name, permissions } }
            }
        `,
    });
    const {user, isValid} = response.data.verifyToken;
    const _user = {
        name: null,
        permissions: [], ...user,
    };
    return {
        type: AUTHENTICATE,
        payload: {
            token: isValid ? _token : null,
            name: _user.name,
            permissions: _user.permissions,
        },
    };
};

export const loadAdminProductList = async () => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `,
        token: state.user.token,
    });
    return {
        type: LOAD_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    };
};

export const createProduct = async (productData) => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            mutation {
                createProduct (input: {
                    name: "${productData.name}",
                    description: "${productData.description}",
                    price: ${productData.price}
                }) { id, name, description, price }
            }
        `,
        token: state.user.token,
    });
    return {
        type: CREATE_PRODUCT,
        payload: response.data.createProduct,
    };
};

export const loadProductList = async () => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `,
        token: state.user.token,
    });
    return {
        type: LOAD_PRODUCT_LIST,
        payload: response.data.getAllProducts,
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