import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminProductList from '@/web-client/components/AdminProductList';
import {loadAdminProductList} from '@/web-client/actions/admin';

const mapStateToProps = (state) => {
    return {
        productList: state.admin.adminProductList
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

