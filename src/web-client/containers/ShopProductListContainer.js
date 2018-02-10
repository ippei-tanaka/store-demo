import {connect} from 'react-redux';
import ShopProductList from '@/web-client/components/ShopProductList';
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

class ShopProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.loadProductList();
    }

    render ()
    {
        const {productList} = this.props;
        return (
            <ShopProductList productList={productList} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductListContainer);

