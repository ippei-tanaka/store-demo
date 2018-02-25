import {connect} from 'react-redux';
import ShopCartPane from '@/web-client/components/ShopCartPane/ShopCartPane';
import React, {Component} from 'react';

class ShopCartPaneContainer extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            isCartExplicitState: null
        };
    }

    render ()
    {
        const {shop:{cart}} = this.props;
        const {isCartExplicitState} = this.state;
        const isCartEmpty = Object.keys(cart).length === 0;
        let isCartVisible = !isCartEmpty;

        if (isCartExplicitState === 'visible')
        {
            isCartVisible = true;
        }
        else if (isCartExplicitState === 'hidden')
        {
            isCartVisible = false;
        }

        return (
            <ShopCartPane
                onClickShowButton={e => { this.setState({isCartExplicitState: 'visible'}); }}
                onClickHideButton={e => { this.setState({isCartExplicitState: 'hidden'}); }}
                isCartVisible={isCartVisible} />
        );
    }
}

export default connect(s => s, null)(ShopCartPaneContainer);

