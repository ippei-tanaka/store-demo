import {connect} from 'react-redux';
import AdminProductForm from '@/web-client/components/AdminProductForm';
import {createProduct, updateProduct} from '@/web-client/actions/admin';

const mapStateToProps = ({admin}, {id}) => {
    const product = admin.adminProductList.find((product) => product.id === id);
    return {
        defaultValues: product
    };
};

const mapDispatchToProps = (dispatch, {id}) => {
    return {
        onSubmit: (formData) => {
            if (!id)
            {
                dispatch(createProduct(formData));
            } else {
                dispatch(updateProduct(id, formData));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductForm);

