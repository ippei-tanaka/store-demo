import auth from '@/web-client/reducers/auth';
import admin from '@/web-client/reducers/admin';
import shop from '@/web-client/reducers/shop';

export default (state = {}, action) => ({
    auth: auth(state.auth, action),
    admin: admin(state.admin, action),
    shop: shop(state.shop, action),
});