import React from 'react';
import styles from '@/web-client/components/AdminNoPermissionPane/AdminNoPermissionPane.css';
import Link from '@/web-client/components/Link/index';
import LogoutButtonContainer from '@/web-client/components/LogoutButton/index';

const AdminNoPermissionPane = () => {
    return (
        <div className={styles.noPermissionMessageContainer}>
            <p className={styles.noPermissionMessage}>You don't have the permission to access the admin app. Please log out and log in as a user with the admin permission to access the admin site.</p>
            <menu className={styles.noPermissionMenu}>
                <li className={styles.noPermissionMenuItem}>
                    <LogoutButtonContainer className={styles.noPermissionLogoutButton}>Log out</LogoutButtonContainer>
                </li>
                <li className={styles.noPermissionMenuItem}>
                    <Link href="/">Go to Shopping Site</Link>
                </li>
            </menu>
        </div>
    );
};

export default AdminNoPermissionPane;