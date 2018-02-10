import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopRoot from '@/web-client/components/ShopRoot';

/*
const getScrollPosition = () => {
    let x = 0;
    let y = 0;

    if (typeof window.pageYOffset === 'number') {
        y = window.pageYOffset;
        x = window.pageXOffset;
    } else if (document.body &&
        (document.body.scrollLeft || document.body.scrollTop)) {
        y = document.body.scrollTop;
        x = document.body.scrollLeft;
    } else if (document.documentElement &&
        (document.documentElement.scrollLeft ||
            document.documentElement.scrollTop)) {
        y = document.documentElement.scrollTop;
        x = document.documentElement.scrollLeft;
    }
    return {
        x,
        y,
    };
};
*/

class ShopRootContainer extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: false,
        };
        this.onBindedScroll = this.onScroll.bind(this);
    }

    onScroll() {
        if (getScrollPosition().y >= 100) {
            this.setState({
                fixedHeader: true,
            });
        } else {
            this.setState({
                fixedHeader: false,
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onBindedScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onBindedScroll);
    }
    */

    render() {
        //const {fixedHeader} = this.state;
        const {children} = this.props;
        return (
            <ShopRoot
                children={children}
            />
        );
    }
}

export default connect(null, null)(ShopRootContainer);

