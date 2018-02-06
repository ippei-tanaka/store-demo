import {connect} from 'react-redux';
import AdminRoot from '@/web-client/components/AdminRoot';

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(AdminRoot);

