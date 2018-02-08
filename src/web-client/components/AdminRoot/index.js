import React from 'react';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';
import Logo from '@/web-client/components/Logo';
import styles from '@/web-client/components/AdminRoot/style.css';

export default ({children, isAdmin}) => {
    return (
        <div className={styles.container}>
            {isAdmin ? children : (
                <div>
                    <h1 className={styles.logoContainer}><Logo/></h1>
                    <LoginFormContainer/>
                </div>
            )}
            {isAdmin ? <LogoutButtonContainer>Logout</LogoutButtonContainer> : null}
        </div>
    );
}