import React from 'react';
import ProductDetailContainer from '@/web-client/components/ShopProductDetail';
import styles from '@/web-client/components/ShopProductDetailPage/ShopProductDetailPage.css';

const ShopProductDetailPage = ({productId}) => (
    <div className={styles.container}>
        <h1 className={styles.heading}>Product Detail</h1>
        <div className={styles.detailContainer}>
            <ProductDetailContainer productId={productId}/>
        </div>
    </div>
);

export default ShopProductDetailPage;