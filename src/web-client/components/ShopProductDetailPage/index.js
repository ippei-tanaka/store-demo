import React from 'react';
import ProductDetailContainer from '@/web-client/containers/ShopProductDetailContainer';
import styles from '@/web-client/components/ShopProductDetailPage/style.css'

export default ({productId}) => (
    <div className={styles.container}>
        <ProductDetailContainer productId={productId}/>
    </div>
);