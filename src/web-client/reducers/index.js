import {LOGIN, LOGOUT} from '@/web-client/actions';

const authenticatedUser = (state = {name: null}, action) => {
    const {type, payload} = action;
    if (type === LOGIN) {
        return {
            ...state,
            name: payload.name,
        };
    } else if (type === LOGOUT) {
        return {
            ...state,
            name: null,
        };
    }
    return state;
};

const productList = (state = [
    {
        name: 'Shampoo',
        id: 0,
    },
    {
        name: 'Cutting Board',
        id: 1,
    },
    {
        name: 'Tea',
        id: 2,
    },
], action) => {
    return state;
};

export default (state = {}, action) => ({
    authenticatedUser: authenticatedUser(state.authenticatedUser, action),
    productList: productList(state.productList, action),
    // location: location(state.location, action),
});