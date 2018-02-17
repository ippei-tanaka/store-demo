import React from 'react';
import styles from '@/web-client/components/Bubble/style.css';

const Bubble = ({children}) => {
    return (
        <span className={styles.speechBubble}>
            {children}
        </span>
    );
};

export default Bubble;