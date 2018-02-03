import {connect} from 'react-redux';
import ProductDetail from '@/web-client/components/ProuctDetail';

const mapStateToProps = (state, props) => {
    return {
        product: state.productList[props.productId]
    };
};

export default connect(mapStateToProps, null)(ProductDetail);
