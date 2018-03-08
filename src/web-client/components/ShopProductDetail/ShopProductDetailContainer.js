import {connect} from 'react-redux';
import ShopProductDetail from '@/web-client/components/ShopProductDetail/ShopProductDetail';
import ShopProductDetailNotFound from '@/web-client/components/ShopProductDetail/ShopProductDetailNotFound';
import React, {Component} from 'react';
import {loadProductList, addToCart} from '@/web-client/actions/shop';
import LoadingPane from '@/web-client/components/LoadingPane';
import {getApiBase} from '@/web-client/fetch';

class ShopProductDetailContainer extends Component
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
        const {productId, shop:{productList}, dispatch} = this.props;
        const product = productList.find(product => product.id === productId);
        const {apiBase} = this.state;

        if (!product)
        {
            return <ShopProductDetailNotFound/>;
        }

        if (!apiBase)
        {
            return <LoadingPane />;
        }

        const _product = {
            ...product,
            imageSrc: product.imageId && apiBase + '/media/' + product.imageId
        };

        return (
            <ShopProductDetail
                product={_product}
                onSubmit={({quantity}) => {
                    dispatch(addToCart({productId, quantity}));
                }}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopProductDetailContainer);

