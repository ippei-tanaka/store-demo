import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import store from '@/web-client/stores';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOAD_PRODUCT_LIST = 'LOAD_PRODUCT_LIST';

export const loadProductList = async () => {
    const state = store.getState();
    const response = await fetch({
        path: '/shop',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `,
        token: state.auth.token,
    });
    return {
        type: LOAD_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    };
};

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