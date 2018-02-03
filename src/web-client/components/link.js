import React from 'react';
import {basename} from '@/web-client/router';
import history from '@/web-client/history';

export default ({href, onClick=()=>{}, children, ...rest}) => (
    <a
        href={basename + href}
        onClick={(e) => {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            history.push(href, {s: 2});
            onClick(e);
        }}
        {...rest}>{children}</a>
);