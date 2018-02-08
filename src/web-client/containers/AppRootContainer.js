import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoot from '@/web-client/components/AppRoot';

const mapStateToProps = ({auth}) => {
    return {
        auth: auth
    };
};

class AppRootContainer extends Component
{
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
}

export default connect(mapStateToProps, null)(AppRootContainer);

