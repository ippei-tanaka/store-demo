import {connect} from 'react-redux';
import ShopProductDetail from '@/web-client/components/ShopProductDetail';
import React, {Component} from 'react';
import {loadProductList, addToCart} from '@/web-client/actions/shop';

const mapStateToProps = (state) => {
    return {
        productList: state.shop.productList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProductList: () => {
            dispatch(loadProductList());
        },
        addToCart: ({productId, quantity}) => {
            dispatch(addToCart({productId, quantity}));
        }
    };
};

class ShopProductDetailContainer extends Component
{
    componentDidMount ()
    {
        this.props.loadProductList();
    }

    render ()
    {
        const {productId, productList, addToCart} = this.props;
        const product = productList.find(product => product.id === productId);
        return (
            <ShopProductDetail
                product={product}
                onSubmit={({quantity}) => addToCart({productId, quantity})}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductDetailContainer);

