import React, {Component} from 'react';
import styles from '@/web-client/components/AdminRoot/style.css';
import AdminNavigation from '@/web-client/components/AdminNavigation';
import AdminHeader from '@/web-client/components/AdminHeader';

export default ({children, isAdmin, openNav, onClickToggleButton}) => {
    return (
        <div>
            {!isAdmin ? (
                <div>
                    You don't have the permission to access the admin app.
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.headerContainer}>
                        <AdminHeader
                            onClickToggle={() => onClickToggleButton(!openNav)}/>
                    </div>
                    <div className={styles.bodyContainer}>
                        <div className={styles.navContainer + ' ' +
                        (openNav ? '' : styles.hidden)}>
                            <AdminNavigation focusable={openNav}/>
                        </div>
                        <div className={styles.mainContentContainer}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}