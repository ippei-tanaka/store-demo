import {connect} from 'react-redux';
import ProductDetail from '@/web-client/components/ProductDetail';
import {addToCart, loadProductList} from '@/web-client/actions';
import React, {Component} from 'react';

const mapStateToProps = ({productList}, {productId}) => {
    return {
        product: productList.find(({id}) => id === productId),
    };
};

const mapDispatchToProps = (dispatch, {productId}) => {
    return {
        loadProductList: () =>
        {
            dispatch(loadProductList());
        },
        onSubmit: ({quantity}) => {
            dispatch(addToCart(
                {
                    productId,
                    quantity: Number.parseInt(quantity)
                },
            ));
        },
    };
};

class ProductDetailContainer extends Component
{
    componentDidMount ()
    {
        this.props.loadProductList();
    }

    render ()
    {
        return (
            <ProductDetail {...this.props} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
