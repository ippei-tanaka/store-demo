import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminProductList from '@/web-client/components/AdminProductList';
import {loadAdminProductList} from '@/web-client/actions';

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProductList: () => {
            dispatch(loadAdminProductList());
        },
    };
};

class AdminProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.loadProductList();
    }

    render ()
    {
        const {productList} = this.props;
        return (
            <AdminProductList productList={productList} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductListContainer);

