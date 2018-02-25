import React from 'react';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/ShopProductList/ShopProductList.css';

const ShopProductList = ({productList}) => (
    <div className={styles.productList}>
        {productList.map(product => (
            <section key={product.id} className={styles.productListItem}>
                <div className={styles.imageLinkContainer}>
                    <Link className={styles.imageLink} href={`/products/${product.id}`}>
                        {product.imageSrc ? (
                            <img className={styles.image} src={product.imageSrc} />
                        ) : (
                            <div className={styles.noImagePane}>No Image</div>
                        )}
                    </Link>
                </div>
                <h1 className={styles.nameLinkContainer}>
                    <Link href={`/products/${product.id}`} className={styles.nameLink}>
                        {product.name}
                    </Link>
                </h1>
                <p className={styles.description}>{product.description}</p>
            </section>
        ))}
    </div>
);

export default ShopProductList;