import cart from '@/web-client/reducers/shop/cart';
import productList from '@/web-client/reducers/shop/productList';

export default (state = {}, action) => ({
    cart: cart(state.cart, action),
    productList: productList(state.productList, action),
});