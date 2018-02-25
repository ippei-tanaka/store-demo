import {connect} from 'react-redux';
import ShopCartPane from '@/web-client/components/ShopCartPane/ShopCartPane';
import React, {Component} from 'react';
import {
    loadProductList,
    removeFromCart,
    showCartPane,
    hideCartPane,
    changeCartPaneDisplayedItemIndex
} from '@/web-client/actions/shop';
import history from '@/web-client/history';
import {getApiBase} from '@/web-client/fetch';

class ShopCartPaneContainer extends Component
{
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
        dispatch(loadProductList());
        getApiBase().then(apiBase => {
            this.setState({apiBase});
        });
    }

    _onClickPrevItemButton (size)
    {
        return function() {
            const {
                shop:{ui: {displayedItemIndex}},
                dispatch
            } = this.props;

            if (displayedItemIndex <= 0)
            {
                dispatch(changeCartPaneDisplayedItemIndex(size - 1));
            }
            else
            {
                dispatch(changeCartPaneDisplayedItemIndex(displayedItemIndex - 1));
            }
        };
    }

    _onClickNextItemButton (size)
    {
        return function () {
            const {
                shop:{ui: {displayedItemIndex}},
                dispatch
            } = this.props;

            if ((size - 1) <= displayedItemIndex)
            {
                dispatch(changeCartPaneDisplayedItemIndex(0));
            }
            else
            {
                dispatch(changeCartPaneDisplayedItemIndex(displayedItemIndex + 1));
            }
        };
    }

    render ()
    {
        const {
            shop:{ui: {isCartPaneVisible, displayedItemIndex}, cart, productList},
            dispatch
        } = this.props;

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
                }}
                onClickCheckOutButton={() => {
                    history.push('/cart');
                }}
                isCartVisible={isCartPaneVisible} />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopCartPaneContainer);

