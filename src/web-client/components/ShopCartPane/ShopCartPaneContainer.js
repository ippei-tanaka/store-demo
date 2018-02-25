import {connect} from 'react-redux';
import ShopCartPane from '@/web-client/components/ShopCartPane/ShopCartPane';
import React, {Component} from 'react';
import {
    loadProductList,
    removeFromCart,
    showCartPane,
    hideCartPane
} from '@/web-client/actions/shop';
import history from '@/web-client/history';

class ShopCartPaneContainer extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            isCartExplicitState: null,
            displayedItemIndex: 0
        };
    }

    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(loadProductList());
    }

    _onClickPrevItemButton (size)
    {
        return function() {
            const {displayedItemIndex} = this.state;

            if (displayedItemIndex <= 0)
            {
                this.setState({displayedItemIndex: size - 1});
            }
            else
            {
                this.setState({displayedItemIndex: displayedItemIndex - 1});
            }
        };
    }

    _onClickNextItemButton (size)
    {
        return function () {
            const {displayedItemIndex} = this.state;

            if ((size - 1) <= displayedItemIndex)
            {
                this.setState({displayedItemIndex: 0});
            }
            else
            {
                this.setState({displayedItemIndex: displayedItemIndex + 1});
            }
        };
    }

    render ()
    {
        const {shop:{ui: {isCartPaneVisible}, cart, productList}, dispatch} = this.props;
        const {displayedItemIndex} = this.state;
        const order = Object.keys(cart).map(productId => ({
            product: productList.find(p => p.id === productId),
            quantity: cart[productId],
        })).filter(order => order.product);

        return (
            <ShopCartPane
                order={order}
                displayedItemIndex={displayedItemIndex}
                onClickPrevItemButton={this._onClickPrevItemButton(order.length).bind(this)}
                onClickNextItemButton={this._onClickNextItemButton(order.length).bind(this)}
                onClickToggleButton={e => isCartPaneVisible ? dispatch(hideCartPane()) : dispatch(showCartPane())}
                onClickHideButton={e => dispatch(hideCartPane())}
                onClickRemoveButton={({productId, quantity}) => {
                    dispatch(removeFromCart({productId, quantity}));
                    this.setState({displayedItemIndex: 0});
                }}
                onClickCheckOutButton={() => {
                    history.push('/cart');
                }}
                isCartVisible={isCartPaneVisible} />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopCartPaneContainer);

