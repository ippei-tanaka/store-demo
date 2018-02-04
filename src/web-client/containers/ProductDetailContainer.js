import {connect} from 'react-redux';
import ProductDetail from '@/web-client/components/ProuctDetail';
import {addToCart} from '@/web-client/actions';

const mapStateToProps = ({productList}, {productId}) => {
    return {
        product: productList[productId],
    };
};

const mapDispatchToProps = (dispatch, {productId}) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
