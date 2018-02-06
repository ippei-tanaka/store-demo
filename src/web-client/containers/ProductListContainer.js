import {connect} from 'react-redux';
import ProductList from '@/web-client/components/ProductList';

const mapStateToProps = (state) => {
    return {
        productList: state.productList,
    };
};

export default connect(mapStateToProps, null)(ProductList);

