import React from 'react';
import LoginFormContainer from '@/web-client/components/LoginFormContainer';
import styles from '@/web-client/components/ShopCartLoginPane/style.css';

const ShopCartLoginPane = () => (
    <div>
        <p className={styles.loginMessage}>Please login to check out.</p>
        <LoginFormContainer/>
    </div>
);

export default ShopCartLoginPane;
