import {connect} from 'react-redux';
import AdminProductForm from '@/web-client/components/AdminProductForm';
import {createProduct} from '@/web-client/actions';

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (formData) => {
            dispatch(createProduct(formData));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductForm);

