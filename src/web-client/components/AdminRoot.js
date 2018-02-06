import React from 'react';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import {permissions} from '@/web-client/auth';

export default ({children, user}) => {
    const isAdmin = user && user.permissions.indexOf(permissions.ADMIN) !== -1;
    return (
        <div id="AdminRoot">
            <h1>Admin Page</h1>
            {isAdmin ? children : <LoginFormContainer/>}
        </div>
    );
}