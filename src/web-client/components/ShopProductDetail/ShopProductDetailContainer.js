import {connect} from 'react-redux';
import ShopProductDetail from '@/web-client/components/ShopProductDetail/ShopProductDetail';
import React, {Component} from 'react';
import {loadProductList, addToCart} from '@/web-client/actions/shop';
import LoadingPane from '@/web-client/components/LoadingPane/index';

class ShopProductDetailContainer extends Component
{
    componentDidMount ()
    {
        this.props.dispatch(loadProductList());
    }

    render ()
    {
        const {productId, shop:{productList}, dispatch} = this.props;
        const product = productList.find(product => product.id === productId);
        return productList.length > 0 ? (
            <ShopProductDetail
                product={product}
                onSubmit={({quantity}) => {
                    dispatch(addToCart({productId, quantity}));
                }}
            />
        ) : <LoadingPane />;
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopProductDetailContainer);

