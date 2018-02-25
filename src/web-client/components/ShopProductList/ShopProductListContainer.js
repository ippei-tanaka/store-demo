import {connect} from 'react-redux';
import ShopProductList from '@/web-client/components/ShopProductList/ShopProductList';
import LoadingPane from '@/web-client/components/LoadingPane';
import React, {Component} from 'react';
import {loadProductList} from '@/web-client/actions/shop';
import {getApiBase} from '@/web-client/fetch';

class ShopProductListContainer extends Component
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
        this.props.dispatch(loadProductList());
        getApiBase().then(apiBase => {
            this.setState({apiBase});
        });
    }

    render ()
    {
        const {shop:{productList}} = this.props;

        const {apiBase} = this.state;

        if (!apiBase)
        {
            return <LoadingPane />;
        }

        const _productList = productList.map(product => {
            return {
                ...product,
                imageSrc: product.imageId && apiBase + '/media/' + product.imageId
            };
        });

        return (
            <ShopProductList productList={_productList} />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopProductListContainer);

