import React from 'react';
import styles from '@/web-client/components/AdminRoot/AdminRoot.css';
import AdminNavigation from '@/web-client/components/AdminNavigation/index';
import AdminHeader from '@/web-client/components/AdminHeader/index';

const AdminRoot = ({children, isNavOpen, disableNav, onClickToggleButton, showHeaderToggleButton}) => {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <AdminHeader
                    showToggleButton={showHeaderToggleButton}
                    onClickToggle={() => onClickToggleButton(!isNavOpen)}/>
            </div>
            <div className={styles.bodyContainer}>
                {!disableNav && (
                    <div className={styles.navContainer + ' ' + (isNavOpen ? '' : styles.hidden)}>
                        <AdminNavigation focusable={isNavOpen}/>
                    </div>
                )}
                <div className={styles.mainContentContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminRoot;