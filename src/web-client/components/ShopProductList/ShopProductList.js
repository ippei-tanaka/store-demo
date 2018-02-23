import React from 'react';
import Link from '@/web-client/components/Link/index';
import styles from '@/web-client/components/ShopProductList/ShopProductList.css';

const ShopProductList = ({productList}) => (
    <div>
        <ul className={styles.productList}>
            {productList.map(product => (
                <li key={product.id} className={styles.productListItem}>
                    <div className={styles.imageLinkContainer}>
                        <Link className={styles.imageLink} href={`/products/${product.id}`}>
                            {product.imageSrc ? (
                                <img className={styles.image} src={product.imageSrc} />
                            ) : (
                                <div className={styles.noImagePane}>No Image</div>
                            )}
                        </Link>
                    </div>
                    <div className={styles.nameLinkContainer}>
                        <Link href={`/products/${product.id}`} className={styles.nameLink}>
                            {product.name}
                        </Link>
                    </div>
                    <p className={styles.description}>{product.description}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default ShopProductList;