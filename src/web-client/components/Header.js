import React from 'react';
import Link from '@/web-client/components/Link';
import CartContainer from '@/web-client/containers/CartContainer';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

const Header = (
    {
        user
    }) => {
    return (
        <header>
            <h1><Link href="/">Store Demo</Link></h1>
            {user ? (
                <div>
                    <p>Hello! {user.name}.</p>
                    <LogoutButtonContainer>Logout</LogoutButtonContainer>
                </div>
            ) : (
                <LoginFormContainer />
            )}
        </header>
    );
};

export default Header;