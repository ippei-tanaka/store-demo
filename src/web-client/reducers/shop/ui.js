import {
    SHOW_CART_PANE,
    HIDE_CART_PANE,
    CHANGE_CART_PANE_DISPLAYED_ITEM_INDEX,
} from '@/web-client/actions/constants';

const initialState = {
    isCartPaneVisible: false,
    displayedItemIndex: 0
};

const ui = (state = initialState, {type, payload}) => {
    if (type === SHOW_CART_PANE)
    {
        return Object.assign({}, state, {isCartPaneVisible: true});
    } else if (type === HIDE_CART_PANE)
    {
        return Object.assign({}, state, {isCartPaneVisible: false});
    } else if (type === CHANGE_CART_PANE_DISPLAYED_ITEM_INDEX)
    {
        return Object.assign({}, state, {displayedItemIndex: payload});
    }
    return state;
};

export default ui;