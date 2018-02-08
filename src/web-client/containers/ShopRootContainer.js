import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopRoot from '@/web-client/components/ShopRoot';
import {permissions} from '@/web-client/auth';

const mapStateToProps = ({auth}) => {
    return {
        auth: auth
    };
};

class ShopRootContainer extends Component
{
    render ()
    {
        const {auth, children} = this.props;
        const isShopper = auth.token && auth.user.permissions.indexOf(permissions.SHOP) !== -1;
        return (
            <ShopRoot
                isShopper={isShopper}
                children={children}
            />
        );
    }
}

export default connect(mapStateToProps, null)(ShopRootContainer);

