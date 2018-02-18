import {Component} from 'react';
import PropTypes from 'prop-types';

class ContentLoaderContainer extends Component
{
    constructor (props)
    {
        super (props);
        this.state = {content: this.props.loadingContent};
    }

    componentDidMount ()
    {
        this.loadContent(this.props.contentPromise);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.contentPromise !== this.props.contentPromise)
        {
            this.loadContent(nextProps.contentPromise);
        }
    }

    loadContent (promise)
    {
        this.setState({content: this.props.loadingContent});
        promise.then(content => this.onContentLoaded(content, promise));
    }

    onContentLoaded (content, promise)
    {
        if (promise === this.props.contentPromise)
        {
            this.setState({content});
        }
    }

    render ()
    {
        const {children} = this.props;
        const {content} = this.state;
        return children({content});
    }
}

ContentLoaderContainer.propTypes = {
    children: PropTypes.func.isRequired,
    loadingContent: PropTypes.element,
    contentPromise: PropTypes.instanceOf(Promise).isRequired
};

export default ContentLoaderContainer;