import React from 'react';
import ShopProductList from '@/web-client/components/ShopProductList';
import styles from '@/web-client/components/ShopProductListPage/ShopProductListPage.css';

const ShopProductListPage = () => (
    <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div className={styles.listContainer}>
            <ShopProductList/>
        </div>
    </div>
);

export default ShopProductListPage;