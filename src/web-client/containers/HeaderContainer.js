import {connect} from 'react-redux';
import Header from '@/web-client/components/Header';

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(Header);

