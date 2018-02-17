import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot';
import {permissions} from '@/web-client/auth';
import {verifyToken} from '@/web-client/actions/auth';
import {openNav, closeNav} from '@/web-client/actions/admin';

class AdminRootContainer extends Component
{
    componentDidMount ()
    {
        const {dispatch} = this.props;
        dispatch(verifyToken());
    }

    render() {
        const {auth, children, admin, dispatch} = this.props;
        const isLoggedIn = auth.token;
        const isAdmin = isLoggedIn && auth.user.permissions.indexOf(permissions.ADMIN) !== -1;
        const isNavOpen = admin.ui.isNavOpen;
        return (
            <AdminRoot
                openNav={isNavOpen}
                onClickToggleButton={openIt => dispatch(openIt ? openNav() : closeNav())}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                children={children}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminRootContainer);

