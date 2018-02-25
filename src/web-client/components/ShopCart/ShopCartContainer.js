import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopCart from '@/web-client/components/ShopCart/ShopCart';
import ShopCartLoginPane from '@/web-client/components/ShopCartLoginPane';
import {placeOrder, removeFromCart, loadProductList} from '@/web-client/actions/shop';
import {verifyToken} from '@/web-client/actions/auth';
import history from '@/web-client/history';

class ShopCartContainer extends Component {

    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(verifyToken());
        dispatch(loadProductList());
    }

    render() {
        const {auth, shop: {cart, productList}, dispatch} = this.props;
        const isLoggedIn = auth.token;
        const order = Object.keys(cart).map(productId => ({
            product: productList.find(p => p.id === productId),
            quantity: cart[productId],
        }));
        return !isLoggedIn ? (
            <ShopCartLoginPane />
        ) : (
            <ShopCart
                order={order}
                onOrderConfirmed={async () => {
                    dispatch(placeOrder());
                    history.push('/thank-you');
                }}
                onClickRemoveButton={({productId, quantity}) => {
                    dispatch(removeFromCart({productId, quantity}));
                }}
            />
        );
    }

}

export default connect(s => s, dispatch => ({dispatch}))(ShopCartContainer);

