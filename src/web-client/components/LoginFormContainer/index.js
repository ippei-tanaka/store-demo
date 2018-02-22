import {connect} from 'react-redux';
import LoginForm from '@/web-client/components/LoginForm/index';
import {authenticate} from '@/web-client/actions/auth';

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: ({username, password}) => {
            dispatch(authenticate({username, password}));
        },
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);

