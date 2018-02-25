import {connect} from 'react-redux';
import LogoutButton from '@/web-client/components/LogoutButton/LogoutButton';
import {logout} from '@/web-client/actions/auth';

const mapDispatchToProps = (dispatch) => {
    return {
        onClickLogoutButton: () => {
            dispatch(logout());
        },
    };
};

export default connect(null, mapDispatchToProps)(LogoutButton);

