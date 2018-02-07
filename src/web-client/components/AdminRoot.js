import React from 'react';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import {permissions} from '@/web-client/auth';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

export default ({children, user}) => {
    const isAdmin = user && user.permissions.indexOf(permissions.ADMIN) !== -1;
    return (
        <div id="AdminRoot">
            <h1>Admin Page</h1>
            {isAdmin ? children : <LoginFormContainer/>}
            {isAdmin ? <LogoutButtonContainer>Logout</LogoutButtonContainer> : null}
        </div>
    );
}