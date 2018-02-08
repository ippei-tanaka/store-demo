import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminProductList from '@/web-client/components/AdminProductList';
import {
    createProduct,
    loadAdminProductList,
    updateProduct,
    deleteProduct
} from '@/web-client/actions/admin';

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

        createProduct: (formData) => {
            dispatch(createProduct(formData));
        },

        updateProduct: (id, formData) => {
            dispatch(updateProduct(id, formData));
        },

        deleteProduct: (id) => {
            dispatch(deleteProduct(id));
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
        const {
            productList,
            createProduct,
            updateProduct,
            deleteProduct
        } = this.props;
        return (
            <AdminProductList
                productList={productList}
                onCreateProduct={createProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductListContainer);

