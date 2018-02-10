import React from 'react';
import styles from '@/web-client/components/Logo/style.css';

export default () => {
    return (
        <span className={styles.container}>
            <span className={styles.iconContainer}><i className="fas fa-bolt"></i></span>
            <span className={styles.text}>Store Demo</span>
        </span>
    );
}