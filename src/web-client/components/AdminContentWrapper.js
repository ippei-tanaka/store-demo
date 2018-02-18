import React from 'react';
import styles from '@/web-client/components/AdminContentWrapper.css';

const AdminContentWrapper = ({children}) => {
    return (
        <div className={styles.contentWrapper}>
            {children}
        </div>
    );
};

export default AdminContentWrapper;