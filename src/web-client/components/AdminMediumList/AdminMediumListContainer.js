import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminMediumList from '@/web-client/components/AdminMediumList/AdminMediumList';
import LoadingPane from '@/web-client/components/LoadingPane/index';
import {
    loadAdminMediumList,
    uploadAdminMedia,
    deleteAdminMedium,
} from '@/web-client/actions/admin';
import {getApiBase} from '@/web-client/fetch';

class AdminMediumListContainer extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            apiBase: null
        };
    }

    componentDidMount ()
    {
        this.props.dispatch(loadAdminMediumList());
        getApiBase().then(apiBase => {
            this.setState({apiBase});
        });
    }

    render ()
    {
        const {
            admin: {adminMediumList},
            dispatch
        } = this.props;

        const {apiBase} = this.state;

        if (!apiBase)
        {
            return <LoadingPane />;
        }

        const mediumList = adminMediumList.map(medium => {
            return {...medium, src: apiBase + '/media/' + medium.id}
        });

        return (
            <AdminMediumList
                mediumList={mediumList}

                onDeleteMedium={(id) => {
                    dispatch(deleteAdminMedium(id));
                }}

                onUploadMedium={({media}) => {
                    dispatch(uploadAdminMedia(media));
                }}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminMediumListContainer);

