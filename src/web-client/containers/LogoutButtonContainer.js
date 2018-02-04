import {connect} from 'react-redux';
import LogoutButton from '@/web-client/components/LogoutButton';
import {logout} from '@/web-client/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(logout());
        },
    };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
