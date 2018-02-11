import cart from '@/web-client/reducers/shop/cart';
import productList from '@/web-client/reducers/shop/productList';
import ui from '@/web-client/reducers/shop/ui';

export default (state = {}, action) => ({
    cart: cart(state.cart, action),
    productList: productList(state.productList, action),
    ui: ui(state.ui, action),
});