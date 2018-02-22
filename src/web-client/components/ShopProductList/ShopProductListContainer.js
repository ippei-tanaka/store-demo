import {connect} from 'react-redux';
import ShopProductList from '@/web-client/components/ShopProductList/ShopProductList';
import LoadingPane from '@/web-client/components/LoadingPane/index';
import React, {Component} from 'react';
import {loadProductList} from '@/web-client/actions/shop';

class ShopProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.dispatch(loadProductList());
    }

    render ()
    {
        const {shop:{productList}} = this.props;
        return (
            productList.length > 0 ? <ShopProductList productList={productList} /> : <LoadingPane />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopProductListContainer);

