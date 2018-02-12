import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopCart from '@/web-client/components/ShopCart';
import {placeOrder} from '@/web-client/actions/shop';

class ShopCartContainer extends Component {

    render() {
        const {shop: {cart, productList}, dispatch} = this.props;
        const order = Object.keys(cart).map(productId => ({
            product: productList.find(p => p.id === productId),
            quantity: cart[productId],
        }));
        return <ShopCart
            order={order}
            onOrderConfirmed={() => dispatch(placeOrder())}
        />;
    }

}

export default connect(s => s, dispatch => ({dispatch}))(ShopCartContainer);

