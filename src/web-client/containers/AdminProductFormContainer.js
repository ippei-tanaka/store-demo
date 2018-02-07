import {connect} from 'react-redux';
import AdminProductForm from '@/web-client/components/AdminProductForm';
import {createProduct} from '@/web-client/actions/admin';

const mapStateToProps = ({admin}, props) => {
    const product = admin.adminProductList.find((product) => product.id === props.id);
    return {
        defaultValues: product
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

