import {connect} from 'react-redux';
import AdminProductForm from '@/web-client/components/AdminProductForm';
import {createProduct} from '@/web-client/actions';

const mapStateToProps = ({productList}, props) => {
    const product = productList.find((product) => product.id === props.id);
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

