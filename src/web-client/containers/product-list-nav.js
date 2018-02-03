import {connect} from 'react-redux';
import ProductList from '@/web-client/components/prouct-list';

const mapStateToProps = (state) => {
    return {
        productList: state.productList,
    };
};

const ProductListNav = connect(mapStateToProps, null)(ProductList);

export default ProductListNav;

