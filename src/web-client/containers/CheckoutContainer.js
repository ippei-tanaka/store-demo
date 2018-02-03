import {connect} from 'react-redux';
import CheckOut from '@/web-client/components/CheckOut';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cart: state.cart,
        productList: state.productList
    };
};

export default connect(mapStateToProps, null)(CheckOut);

