import React from 'react';
import styles from '@/web-client/components/ThankYouPage/ThankYouPage.css';

const ThankYouPage = () =>
{
    return (
        <div className={styles.container}>
            <p className={styles.title}>Thank you for ordering!</p>
        </div>
    );
};

export default ThankYouPage;