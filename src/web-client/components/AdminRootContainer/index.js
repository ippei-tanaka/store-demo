import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot/index';
import {permissions} from '@/web-client/auth/index';
import {verifyToken} from '@/web-client/actions/auth';
import {openNav, closeNav} from '@/web-client/actions/admin';
import AdminLoginPane from '@/web-client/components/AdminLoginPane/index';
import AdminNoPermissionPane from '@/web-client/components/AdminNoPermissionPane/index';
import AdminContentWrapper from '@/web-client/components/AdminContentWrapper/index';

class AdminRootContainer extends Component
{
    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(verifyToken());
    }

    render() {
        const {auth, admin, dispatch, children} = this.props;
        const isLoggedIn = auth.token;
        const isAdmin = isLoggedIn && auth.user.permissions.indexOf(permissions.ADMIN) !== -1;
        const isNavOpen = admin.ui.isNavOpen;
        return (
            <AdminRoot
                disableNav={!isAdmin}
                isNavOpen={isAdmin && isNavOpen}
                onClickToggleButton={openIt => dispatch(openIt ? openNav() : closeNav())}
                showHeaderToggleButton={isAdmin}
                children={!isLoggedIn ? <AdminLoginPane /> : !isAdmin ? <AdminNoPermissionPane/> : <AdminContentWrapper>{children}</AdminContentWrapper>}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminRootContainer);

