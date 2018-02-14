import React from 'react';
import ShopCartContainer from '@/web-client/containers/ShopCartContainer';
import styles from '@/web-client/components/ShopCartPage/style.css';

export default () =>
{
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Checkout</h1>
            <ShopCartContainer/>
        </div>
    );
};