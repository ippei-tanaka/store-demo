import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopRoot from '@/web-client/components/ShopRoot';
// import {verifyToken} from '@/web-client/actions/auth';
// import {permissions} from '@/web-client/auth';

const mapStateToProps = ({auth}) => {
    return {
        auth: auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyToken: () => {
            dispatch(verifyToken());
        },
    };
};

class AdminRootContainer extends Component
{
    componentDidMount ()
    {
        this.props.verifyToken();
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRootContainer);

