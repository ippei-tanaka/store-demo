import React from 'react';
import ProductDetailContainer from '@/web-client/components/ShopProductDetail';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/ShopProductDetailPage/ShopProductDetailPage.css';

const ShopProductDetailPage = ({productId}) => (
    <div className={styles.container}>
        <h1 className={styles.heading}>Product Detail</h1>
        <nav className={styles.navigation}>
            <ol className={styles.navigationList}>
                <li className={styles.navigationListItem}>
                    <Link
                        className={styles.navigationLink}
                        href='/products'>
                        Products
                    </Link>
                </li>
                <li className={styles.navigationListItem}>Product Detail</li>
            </ol>
        </nav>
        <div className={styles.detailContainer}>
            <ProductDetailContainer productId={productId}/>
        </div>
    </div>
);

export default ShopProductDetailPage;