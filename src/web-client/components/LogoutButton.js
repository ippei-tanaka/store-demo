import React from 'react';

export default ({onClick, children, ...rest}) => (
    <button
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        {...rest}
    >{children}</button>
);