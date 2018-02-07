import React from 'react';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

export default ({children, isAdmin}) => {
    return (
        <div id="AdminRoot">
            <h1>Admin Page</h1>
            {isAdmin ? children : <LoginFormContainer/>}
            {isAdmin ? <LogoutButtonContainer>Logout</LogoutButtonContainer> : null}
        </div>
    );
}