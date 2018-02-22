import {connect} from 'react-redux';
import LogoutButton from '@/web-client/components/LogoutButton/index';
import {logout} from '@/web-client/actions/auth';

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(logout());
        },
    };
};

export default connect(null, mapDispatchToProps)(LogoutButton);

