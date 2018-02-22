import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminProductList from '@/web-client/components/AdminProductList/index';
import LoadingPane from '@/web-client/components/LoadingPane/index';
import {
    createProduct,
    loadAdminProductList,
    updateProduct,
    deleteProduct
} from '@/web-client/actions/admin';

class AdminProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.dispatch(loadAdminProductList());
    }

    render ()
    {
        const {
            admin: {adminProductList},
            dispatch
        } = this.props;
        return adminProductList.length > 0 ? (
            <AdminProductList
                productList={adminProductList}

                onCreateProduct={(formData) => {
                    dispatch(createProduct(formData));
                }}

                onUpdateProduct={(id, formData) => {
                    dispatch(updateProduct(id, formData));
                }}

                onDeleteProduct={(id) => {
                    dispatch(deleteProduct(id));
                }}
            />
        ) : <LoadingPane />;
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminProductListContainer);

