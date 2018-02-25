import React from 'react';
import ShopCartContainer from '@/web-client/components/ShopCart';
import styles from '@/web-client/components/ShopCartPage/ShopCartPage.css';

const ShopCartPage = () =>
{
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <h1 className={styles.title}>Checkout</h1>
                <ShopCartContainer/>
            </div>
        </div>
    );
};

export default ShopCartPage;