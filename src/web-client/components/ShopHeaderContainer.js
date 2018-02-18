import {connect} from 'react-redux';
import ShopHeader from '@/web-client/components/ShopHeader';
import React, {Component} from 'react';
import {
    removeBubbleTextOnCartButton,
} from '@/web-client/actions/shop';

class ShopHeaderContainer extends Component
{
    render ()
    {
        const {shop, dispatch, auth}  = this.props;
        return (
            <ShopHeader
                bubbleTextOnCartButton={shop.ui.bubbleTextOnCartButton}
                onBubbleTextDisappear={() => dispatch(removeBubbleTextOnCartButton())}
                showLogoutButton={!!auth.token}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(ShopHeaderContainer);

