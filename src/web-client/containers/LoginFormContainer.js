import {connect} from 'react-redux';
import LoginForm from '@/web-client/components/LoginForm';
import {login} from '@/web-client/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: ({username, password}) => {
            dispatch(login({username, password}));
        },
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);

