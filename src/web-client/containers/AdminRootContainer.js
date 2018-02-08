import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot';
import {permissions} from '@/web-client/auth';

const mapStateToProps = ({auth}) => {
    return {
        auth: auth
    };
};

class AdminRootContainer extends Component
{
    render ()
    {
        const {auth, children} = this.props;
        const isAdmin = auth.token && auth.user.permissions.indexOf(permissions.ADMIN) !== -1;
        return (
            <AdminRoot
                isAdmin={isAdmin}
                children={children}
            />
        );
    }
}

export default connect(mapStateToProps, null)(AdminRootContainer);

