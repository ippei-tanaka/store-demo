import user from '@/web-client/reducers/user';
import cart from '@/web-client/reducers/cart';
import productList from '@/web-client/reducers/productList';

export default (state = {}, action) => ({
    user: user(state.user, action),
    productList: productList(state.productList, action),
    cart: cart(state.cart, action),
});