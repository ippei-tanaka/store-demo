import {
    CLOSE_ADMIN_NAV,
    OPEN_ADMIN_NAV,
} from '@/web-client/actions/constants';

const initialState = {
    isNavOpen: false
};

const ui = (state = initialState, {type}) => {
    if (type === OPEN_ADMIN_NAV) {
        return Object.assign({}, state, {isNavOpen: true});
    }
    else if (type === CLOSE_ADMIN_NAV) {
        return Object.assign({}, state, {isNavOpen: false});
    }
    return state;
};

export default ui;