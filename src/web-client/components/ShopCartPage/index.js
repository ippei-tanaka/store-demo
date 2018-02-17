import React from 'react';
import ShopCartContainer from '@/web-client/components/ShopCartContainer';
import styles from '@/web-client/components/ShopCartPage/style.css';

const ShopCartPage = () =>
{
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Checkout</h1>
            <ShopCartContainer/>
        </div>
    );
};

export default ShopCartPage;