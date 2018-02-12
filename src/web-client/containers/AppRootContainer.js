import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoot from '@/web-client/components/AppRoot';
// import jwtDecode from 'jwt-decode';
// import {verifyToken} from '@/web-client/actions/auth';

class AppRootContainer extends Component
{
    /*
    componentDidMount ()
    {
        const {auth: {token}, dispatch} = this.props;

        if (typeof token === 'string') {
            const {exp} = jwtDecode(token);
            const current = Date.now() / 1000;
            const diff = exp - current;
            setTimeout(() => {
                dispatch(verifyToken());
            }, Math.max(diff, 0));
        }
    }

    render ()
    {
        const {auth, children} = this.props;
        const isLoggedin = !!auth.token;
        return (
            <AppRoot
                isLoggedin={isLoggedin}
                children={children}
            />
        );
    }
    */
    render ()
    {
        const {children} = this.props;
        return (
            <AppRoot>{children}</AppRoot>
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AppRootContainer);

