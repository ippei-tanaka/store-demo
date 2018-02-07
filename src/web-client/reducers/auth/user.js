import {
    AUTHENTICATE,
    LOGOUT,
    VERIFY_TOKEN
} from '@/web-client/actions/auth';

const initialState = {
    name: null,
    permissions: [],
};

const auth = (state = initialState, {type, payload}) => {
    if (type === AUTHENTICATE
        || type === VERIFY_TOKEN) {
        const {name, permissions} = payload;
        return {
            name: typeof name === 'string' && name !== '' ? name : null,
            permissions: Array.isArray(permissions) ? permissions : []
        };
    } else if (type === LOGOUT) {
        return initialState;
    }
    return state;
};

export default auth;