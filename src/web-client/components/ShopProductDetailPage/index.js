import React from 'react';
import ProductDetailContainer from '@/web-client/containers/ShopProductDetailContainer';
import styles from '@/web-client/components/ShopProductDetailPage/style.css'

const ShopProductDetailPage = ({productId}) => (
    <div className={styles.container}>
        <ProductDetailContainer productId={productId}/>
    </div>
);

export default ShopProductDetailPage;