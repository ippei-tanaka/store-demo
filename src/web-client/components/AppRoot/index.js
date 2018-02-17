//import React from 'react';
//import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
//import styles from '@/web-client/components/AppRoot/style.css';

/*
export default ({children, isLoggedin}) => {
    return (
        <div>
            {!isLoggedin ? (
                <div className={styles.loginPanelContainer}>
                    <div className={styles.loginPane}>
                        <h1 className={styles.logoContainer}>
                            <span className={styles.logoIconContainer}><i className="fas fa-bolt"></i></span>
                            <span className={styles.logoText}>Store Demo</span>
                        </h1>
                        <LoginFormContainer/>
                    </div>
                </div>
            ) : children}
        </div>
    );
}
*/
const AppRoot = ({children}) => {
    return children;
};

export default AppRoot;