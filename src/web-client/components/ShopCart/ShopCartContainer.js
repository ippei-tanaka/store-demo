import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopCart from '@/web-client/components/ShopCart/ShopCart';
import ShopCartLoginPane from '@/web-client/components/ShopCartLoginPane';
import {placeOrder, removeFromCart, loadProductList, hideCartPane} from '@/web-client/actions/shop';
import {verifyToken} from '@/web-client/actions/auth';
import history from '@/web-client/history';
import {getApiBase} from '@/web-client/fetch';

class ShopCartContainer extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            apiBase: null
        };
    }

    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(verifyToken());
        dispatch(loadProductList());
        dispatch(hideCartPane());
        getApiBase().then(apiBase => {
            this.setState({apiBase});
        });
    }

    render() {
        const {auth, shop: {cart, productList}, dispatch} = this.props;

        const isLoggedIn = auth.token;

        const {apiBase} = this.state;

        const order = Object.keys(cart).map(productId => {
            const product = productList.find(p => p.id === productId);
            return {
                product: product && {
                    ...product,
                    imageSrc: product.imageId && apiBase ? apiBase + '/media/' + product.imageId : null
                },
                quantity: cart[productId],
            };
        }).filter(order => order.product);


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

