import {connect} from 'react-redux';
import {login, logout} from '@/web-client/actions';
import Header from '@/web-client/components/Header';

const mapStateToProps = (state) => {
    return {
        authenticatedUserName: state.authenticatedUser.name,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickLoginButton: (e) => {
            e.preventDefault();
            dispatch(login());
        },
        onClickLogoutButton: (e) => {
            e.preventDefault();
            dispatch(logout());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

