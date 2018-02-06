import {
    AUTHENTICATE,
    LOGOUT,
} from '@/web-client/actions';

const initialState = {
    token: null,
    name: null,
    permissions: [],
};

const user = (state = initialState, {type, payload}) => {
    if (type === AUTHENTICATE) {
        const _payload = {...initialState, ...payload};
        return {
            token: _payload.token,
            name: _payload.name,
            permissions: _payload.permissions,
        };
    } else if (type === LOGOUT) {
        return initialState;
    }
    return state;
};

export default user;