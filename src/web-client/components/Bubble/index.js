import React from 'react';
import styles from '@/web-client/components/Bubble/style.css';

export default (
    {
        children
    }) => {
    return (
        <span className={styles.speechBubble}>
            {children}
        </span>
    );
};