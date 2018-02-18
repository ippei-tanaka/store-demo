import {Component} from 'react';

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

export default ContentLoaderContainer;