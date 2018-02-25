import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_PRODUCT_LIST,
    SHOW_CART_PANE,
    HIDE_CART_PANE,
    PLACE_ORDER,
} from '@/web-client/actions/constants';

export const addToCart = async ({productId, quantity}) => (dispatch, getState) => {
    const state = getState();
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: state.shop.productList.find(p => p.id === productId),
            quantity,
        },
    });
};

export const removeFromCart = async ({productId, quantity}) => ({
    type: REMOVE_FROM_CART,
    payload: {
        productId,
        quantity,
    },
});

export const placeOrder = async () => async (dispatch, getState) => {
    const {shop:{cart}, auth: {token}} = getState();
    const orderString = Object.keys(cart).map(productId => `{productId: "${productId}", quantity: ${cart[productId]}}`).join(',');
    const response = await fetch({
        path: '/account',
        query: `
            mutation {
                placeOrder (input: [${orderString}]) { id }
            }
        `,
        token: token,
    });
    dispatch({
        type: PLACE_ORDER,
        orderId: response.data.placeOrder.id
    });
};

export const loadProductList = async () => {
    const response = await fetch({
        path: '/product',
        query: `
            query {
                getAllProducts { id, name, description, price, imageId }
            }
        `,
    });
    return {
        type: LOAD_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    };
};

export const showCartPane = async () => ({
    type: SHOW_CART_PANE,
    payload: null,
});

export const hideCartPane = async () => ({
    type: HIDE_CART_PANE,
    payload: null,
});