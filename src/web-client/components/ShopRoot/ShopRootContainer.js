import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopRoot from '@/web-client/components/ShopRoot/ShopRoot';

class ShopRootContainer extends Component
{
    render ()
    {
        return (
            <ShopRoot>{this.props.children}</ShopRoot>
        );
    }
}

export default connect(null, null)(ShopRootContainer);