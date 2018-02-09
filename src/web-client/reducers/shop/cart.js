import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '@/web-client/actions/constants';

const cart = (state = {}, {type, payload}) => {
    if (type === ADD_TO_CART) {
        const {quantity, productId} = payload;

        if (typeof quantity !== 'number' || isNaN(quantity)) {
            return state;
        }

        const currentQuantity = state[productId] || 0;
        return {
            ...state,
            [productId]: currentQuantity + quantity,
        };
    } else if (type === REMOVE_FROM_CART) {
        const {quantity, productId} = payload;

        if (typeof quantity !== 'number' || isNaN(quantity)) {
            return state;
        }

        const currentQuantity = state[productId] || 0;
        const newQuantity = currentQuantity - quantity;

        if (newQuantity <= 0) {
            const newState = {...state};
            delete newState[productId];
            return newState;
        } else {
            return {
                ...state,
                [productId]: newQuantity,
            };
        }
    }
    return state;
};

export default cart;