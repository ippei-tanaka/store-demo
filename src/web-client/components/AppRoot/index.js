import React from 'react';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import Logo from '@/web-client/components/Logo';
import styles from '@/web-client/components/AppRoot/style.css';

export default ({children, isLoggedin}) => {
    return (
        <div>
            {!isLoggedin ? (
                <div className={styles.loginPanelContainer}>
                    <div className={styles.loginPane}>
                        <h1 className={styles.logoContainer}><Logo/></h1>
                        <LoginFormContainer/>
                    </div>
                </div>
            ) : children}
        </div>
    );
}