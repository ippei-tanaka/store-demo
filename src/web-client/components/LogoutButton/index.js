import React from 'react';

const LogoutButton = ({onClick, children, ...rest}) => (
    <button
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        {...rest}
    >{children}</button>
);

export default LogoutButton;