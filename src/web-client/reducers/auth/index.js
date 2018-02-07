import token from '@/web-client/reducers/auth/token';
import user from '@/web-client/reducers/auth/user';

export default (state = {}, action) => ({
    token: token(state.token, action),
    user: user(state.user, action),
});