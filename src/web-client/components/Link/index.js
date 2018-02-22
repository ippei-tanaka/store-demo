import React from 'react';
import {basename} from '@/web-client/router/index';
import history from '@/web-client/history/index';

const createOnClickAnchor = (callback) => {
    return (e) => {
        e.preventDefault();
        history.push(e.currentTarget.getAttribute('href'));
        callback(e);
    };
};

const Link = ({href, onClick = () => {}, children, ...rest}) => (
    <a
        href={basename + href}
        onClick={createOnClickAnchor(onClick)}
        {...rest}>
        {children}
    </a>
);

export default Link;