//import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import {ADD_TO_CART, REMOVE_FROM_CART} from '@/web-client/actions/constants';
//import store from '@/web-client/stores';

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