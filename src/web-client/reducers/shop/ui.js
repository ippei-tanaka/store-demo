import {
    ADD_TO_CART,
    SHOW_CART_PANE,
    HIDE_CART_PANE
} from '@/web-client/actions/constants';

const initialState = {
    isCartPaneVisible: false
};

const ui = (state = initialState, {type, payload}) => {
    if (type === ADD_TO_CART) {
        return Object.assign({}, state, {isCartPaneVisible: true});
    } else if (type === SHOW_CART_PANE)
    {
        return Object.assign({}, state, {isCartPaneVisible: true});
    } else if (type === HIDE_CART_PANE)
    {
        return Object.assign({}, state, {isCartPaneVisible: false});
    }
    return state;
};

export default ui;