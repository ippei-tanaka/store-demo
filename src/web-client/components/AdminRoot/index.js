import React from 'react';
import styles from '@/web-client/components/AdminRoot/style.css';
import AdminNavigation from '@/web-client/components/AdminNavigation';
import AdminHeader from '@/web-client/components/AdminHeader';
import Link from '@/web-client/components/Link';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

export default ({children, isAdmin, openNav, onClickToggleButton, isLoggedIn}) => {

    if (!isLoggedIn)
    {
        return (
            <div className={styles.loginPanelContainer}>
                <div className={styles.loginPane}>
                    <h1 className={styles.logoContainer}>
                        <span className={styles.logoIconContainer}><i className="fas fa-bolt"></i></span>
                        <span className={styles.logoText}>Store Demo</span>
                    </h1>
                    <LoginFormContainer/>
                </div>
            </div>
        );
    }

    if (!isAdmin)
    {
        return (
            <div className={styles.noPermissionMessageContainer}>
                <p className={styles.noPermissionMessage}>You don't have the permission to access the admin app. Please log out and log in as a user with the admin permission to access the admin site.</p>
                <menu className={styles.noPermissionMenu}>
                    <li className={styles.noPermissionMenuItem}>
                        <LogoutButtonContainer className={styles.noPermissionLogoutButton}>Log out</LogoutButtonContainer>
                    </li>
                    <li className={styles.noPermissionMenuItem}>
                        <Link href="/">Go to Shop Home</Link>
                    </li>
                </menu>
            </div>
        );
    }

    return (
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
    );
}