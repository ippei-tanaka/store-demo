import React from "react";

const Header = ({authenticatedUserName, onClickLoginButton, onClickLogoutButton}) => {
    return (
        <header>
            <h1>Store Demo</h1>
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