import React from 'react';
import styles from '@/web-client/components/AdminRoot/style.css';
import AdminNavigation from '@/web-client/components/AdminNavigation';
import AdminHeader from '@/web-client/components/AdminHeader';

const AdminRoot = ({children, isNavOpen, onClickToggleButton, showHeaderToggleButton}) => {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <AdminHeader
                    showToggleButton={showHeaderToggleButton}
                    onClickToggle={() => onClickToggleButton(!isNavOpen)}/>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.navContainer + ' ' + (isNavOpen ? '' : styles.hidden)}>
                    <AdminNavigation focusable={isNavOpen}/>
                </div>
                <div className={styles.mainContentContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminRoot;