import React from 'react';
import Link from '@/web-client/components/Link';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

const Header = (
    {
        userName
    }) => {
    return (
        <header id="Header">
            <h1><Link href="/">Store Demo</Link></h1>
            {userName ? (
                <div>
                    <p>Hello! {userName}.</p>
                    <LogoutButtonContainer>Logout</LogoutButtonContainer>
                </div>
            ) : (
                <LoginFormContainer />
            )}
        </header>
    );
};

export default Header;