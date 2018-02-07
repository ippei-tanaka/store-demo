import {
    AUTHENTICATE,
    LOGOUT,
    VERIFY_TOKEN,
} from '@/web-client/actions/auth';

const token = (state = null, {type, payload}) => {
    if (type === AUTHENTICATE
        || type === VERIFY_TOKEN) {
        const {token} = payload;
        return typeof token === 'string' && token !== '' ? token : null;
    } else if (type === LOGOUT) {
        return null;
    }
    return state;
};

export default token;