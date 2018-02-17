import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoot from '@/web-client/components/AppRoot';

class AppRootContainer extends Component
{
    render ()
    {
        const {children} = this.props;
        return (
            <AppRoot>{children}</AppRoot>
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AppRootContainer);

