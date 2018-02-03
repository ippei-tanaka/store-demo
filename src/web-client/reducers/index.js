import {LOGIN, LOGOUT} from "@/web-client/actions";

const authenticatedUser = (state = {name: null}, action) => {
    const {type, payload} = action;
    if (type === LOGIN) {
        return {
            ...state,
            name: payload.name
        };
    } else if (type === LOGOUT) {
        return {
            ...state,
            name: null
        };
    }
    return state;
};

export default (state = {}, action) => ({
    authenticatedUser: authenticatedUser(state.authenticatedUser, action)
});