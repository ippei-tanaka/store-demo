import {connect} from 'react-redux';
import ShopHeader from '@/web-client/components/ShopHeader';
import React, {Component} from 'react';
import {
    removeBubbleTextOnCartButton,
} from '@/web-client/actions/shop';

const mapStateToProps = (state) => {
    return {
        bubbleTextOnCartButton: state.shop.ui.bubbleTextOnCartButton,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeBubbleTextOnCartButton: () => {
            dispatch(removeBubbleTextOnCartButton());
        }
    };
};

class ShopHeaderContainer extends Component
{
    render ()
    {
        const {bubbleTextOnCartButton, removeBubbleTextOnCartButton} = this.props;
        return (
            <ShopHeader
                bubbleTextOnCartButton={bubbleTextOnCartButton}
                onBubbleTextDisappear={removeBubbleTextOnCartButton}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeaderContainer);

