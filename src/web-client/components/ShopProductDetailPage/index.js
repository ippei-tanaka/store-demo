import React from 'react';
import ProductDetailContainer from '@/web-client/components/ShopProductDetailContainer/index';
import styles from '@/web-client/components/ShopProductDetailPage/ShopProductDetailPage.css'

const ShopProductDetailPage = ({productId}) => (
    <div className={styles.container}>
        <ProductDetailContainer productId={productId}/>
    </div>
);

export default ShopProductDetailPage;