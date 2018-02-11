import {connect} from 'react-redux';
import Cart from '@/web-client/components/Cart';
import {removeFromCart} from '@/web-client/actions/shop';

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        productList: state.productList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickRemove: ({id}) => {
            dispatch(removeFromCart(
                {
                    productId: id,
                    quantity: Number.MAX_SAFE_INTEGER
                },
            ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

