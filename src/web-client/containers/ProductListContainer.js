import {connect} from 'react-redux';
import ProductList from '@/web-client/components/ProductList';
import React, {Component} from 'react';
import {loadProductList} from '@/web-client/actions';

const mapStateToProps = (state) => {
    return {
        productList: state.productList,
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
        //this.props.loadProductList();
    }

    render ()
    {
        return (
            <ProductList {...this.props} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);

