import {connect} from 'react-redux';
import Header from '@/web-client/components/Header';

const mapStateToProps = (state) => {
    return {
        userName: state.user.name,
    };
};

export default connect(mapStateToProps, null)(Header);

