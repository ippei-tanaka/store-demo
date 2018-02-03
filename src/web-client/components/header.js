import React from 'react';
import Link from '@/web-client/components/link';

const Header = (
    {
        authenticatedUserName,
        onClickLoginButton,
        onClickLogoutButton,
        onClickHeading,
    }) => {
    return (
        <header>
            <h1><Link href="/" onClick={onClickHeading}>Store Demo</Link></h1>
            {authenticatedUserName ? (
                <div>
                    <p>Hello! {authenticatedUserName}.</p>
                    <button onClick={onClickLogoutButton}>Logout</button>
                </div>
            ) : (
                <button onClick={onClickLoginButton}>Login</button>
            )}
        </header>
    );
};

export default Header;