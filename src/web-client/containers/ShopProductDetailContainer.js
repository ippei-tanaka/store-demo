import {connect} from 'react-redux';
import ShopProductDetail from '@/web-client/components/ShopProductDetail';
import React, {Component} from 'react';
import {loadProductList} from '@/web-client/actions/product';

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
        const {productId, productList} = this.props;
        const product = productList.find(product => product.id === productId);
        return (
            <ShopProductDetail product={product} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductDetailContainer);

