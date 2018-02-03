import {connect} from 'react-redux';
import ProductDetail from '@/web-client/components/prouct-detail';

const mapStateToProps = (state, props) => {
    return {
        product: state.productList[props.productId]
    };
};

const ConnectedProductDetail = connect(mapStateToProps, null)(ProductDetail);

export default ConnectedProductDetail;

