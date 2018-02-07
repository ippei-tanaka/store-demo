import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot';
import {verifyToken} from '@/web-client/actions';

const mapStateToProps = (state) => {
    return {
        user: state.user
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
        return (
            <AdminRoot {...this.props} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRootContainer);

