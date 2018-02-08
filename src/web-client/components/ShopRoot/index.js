import React from 'react';
// import styles from '@/web-client/components/AppRoot/style.css';

export default ({children, isShopper}) => {
    return (
        <div>
            {!isShopper ? (
                <div>You don't have the permission to access the shopping app.</div>
            ) : (
                <div>{children}</div>
            )}
        </div>
    );
}