import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminProductList from '@/web-client/components/AdminProductList/AdminProductList';
import LoadingPane from '@/web-client/components/LoadingPane/index';
import {
    createProduct,
    loadAdminProductList,
    updateProduct,
    deleteProduct
} from '@/web-client/actions/admin';
import {getApiBase} from '@/web-client/fetch';

class AdminProductListContainer extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            apiBase: null
        };
    }

    componentDidMount ()
    {
        this.props.dispatch(loadAdminProductList());
        getApiBase().then(apiBase => {
            this.setState({apiBase});
        });
    }

    render ()
    {
        const {
            admin: {adminProductList},
            dispatch
        } = this.props;

        const {apiBase} = this.state;

        if (!apiBase)
        {
            return <LoadingPane />;
        }

        const productList = adminProductList.map(product => {
            return {
                ...product,
                imageSrc: product.imageId && apiBase + '/media/' + product.imageId
            };
        });

        return (
            <AdminProductList
                productList={productList}

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
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminProductListContainer);

