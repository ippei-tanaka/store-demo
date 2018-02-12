import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopCart from '@/web-client/components/ShopCart';
import {placeOrder} from '@/web-client/actions/shop';
import {verifyToken} from '@/web-client/actions/auth';

class ShopCartContainer extends Component {

    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(verifyToken());
    }

    render() {
        const {auth, shop: {cart, productList}, dispatch} = this.props;
        const isLoggedIn = auth.token;
        const order = Object.keys(cart).map(productId => ({
            product: productList.find(p => p.id === productId),
            quantity: cart[productId],
        }));
        return (
            <ShopCart
                order={order}
                onOrderConfirmed={async () => {
                    dispatch(placeOrder());
                }}
                isLoggedIn={isLoggedIn}
            />
        );
    }

}

export default connect(s => s, dispatch => ({dispatch}))(ShopCartContainer);

