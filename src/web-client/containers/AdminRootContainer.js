import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot';
import {permissions} from '@/web-client/auth';
import {
    openNav,
    closeNav,
} from '@/web-client/actions/admin';

const mapStateToProps = ({auth, admin}) => {
    return {
        auth: auth,
        admin: admin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openNav: () => {
            dispatch(openNav());
        },

        closeNav: () => {
            dispatch(closeNav());
        },
    };
};

class AdminRootContainer extends Component {
    render() {
        const {auth, children, admin, openNav, closeNav} = this.props;
        const isAdmin = auth.token && auth.user.permissions.indexOf(permissions.ADMIN) !== -1;
        const isNavOpen = admin.ui.isNavOpen;
        return (
            <AdminRoot
                openNav={isNavOpen}
                onClickToggleButton={openIt => (openIt ? openNav : closeNav)()}
                isAdmin={isAdmin}
                children={children}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRootContainer);

