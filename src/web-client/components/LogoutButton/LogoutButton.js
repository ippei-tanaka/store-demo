import React from 'react';

const LogoutButton = ({onClickLogoutButton, onClick, children, ...rest}) => (
    <button
        onClick={e => {
            e.preventDefault();
            onClickLogoutButton(e);
            onClick(e);
        }}
        {...rest}
    >{children}</button>
);

export default LogoutButton;