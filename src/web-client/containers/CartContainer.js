import {connect} from 'react-redux';
import Cart from '@/web-client/components/Cart';

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        productList: state.productList
    };
};

export default connect(mapStateToProps, null)(Cart);

