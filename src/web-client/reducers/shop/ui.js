import {
    ADD_TO_CART,
    REMOVE_BUBBLE_TEXT_ON_CART_BUTTON
} from '@/web-client/actions/constants';

import isPlainObject from 'lodash/isPlainObject';
import isInteger from 'lodash/isInteger';

const constructMessage = (payload) => {
    if (!isPlainObject(payload)
        || !isPlainObject(payload.product)
        || !isInteger(payload.quantity))
    {
        return '';
    }
    const {product: {name}, quantity} = payload;
    return `${name} x ${quantity} Added`;
};

const initialState = {
    bubbleTextOnCartButton: ''
};

const ui = (state = initialState, {type, payload}) => {
    if (type === ADD_TO_CART) {
        return Object.assign({}, state, {bubbleTextOnCartButton: constructMessage(payload)});
    } else if (type === REMOVE_BUBBLE_TEXT_ON_CART_BUTTON)
    {
        return Object.assign({}, state, {bubbleTextOnCartButton: ''});
    }
    return state;
};

export default ui;