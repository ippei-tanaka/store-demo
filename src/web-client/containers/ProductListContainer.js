import {connect} from 'react-redux';
import ProductList from '@/web-client/components/ProductList';
import React, {Component} from 'react';
import {loadProductList} from '@/web-client/actions/shop';

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

class ProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.loadProductList();
    }

    render ()
    {
        const {productList} = this.props;
        return (
            <ProductList productList={productList} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);

