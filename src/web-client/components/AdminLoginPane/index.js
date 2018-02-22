import React from 'react';
import styles from '@/web-client/components/AdminLoginPane/AdminLoginPane.css';
import LoginFormContainer from '@/web-client/components/LoginForm/index';

const AdminLoginPane = () => {
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
};

export default AdminLoginPane;