import React from 'react';
import styles from '@/web-client/components/ShopCartPane/ShopCartPane.css';
import {Button, ButtonThemes} from '@/web-client/components/Button';
import Link from '@/web-client/components/Link';

const ShopCartPane = (
    {
        order,
        isCartVisible,
        onClickHideButton,
        onClickToggleButton,
        onClickRemoveButton,
        displayedItemIndex = 0,
        onClickPrevItemButton,
        onClickNextItemButton,
        onClickCheckOutButton
    }) => (
    <div className={styles.container + (isCartVisible ? '' : ' ' + styles.hidden)}>
        {order.length > 0 ? (
            <div className={styles.orderListContainer}>
                <ul className={styles.orderList} data-displayed-item-index={displayedItemIndex}>
                    {order.map(({product, quantity}) => {
                        return (
                            <li key={product.id} className={styles.orderListItem}>
                                <dl className={styles.productSpecList}>
                                    <dt className={styles.productSpecName}>Product Name</dt>
                                    <dd className={styles.productSpecValue}><Link className={styles.productSpecValueLink} href={`/products/${product.id}`}>{product.name}</Link></dd>
                                    {product.imageSrc && (<dt className={styles.productSpecName}>Image</dt>)}
                                    {product.imageSrc && (
                                        <dd className={styles.productSpecValue}>
                                            <Link className={styles.productSpecValueLink} href={`/products/${product.id}`}><img src={product.imageSrc} className={styles.productImage} /></Link>
                                        </dd>
                                    )}

                                    <dt className={styles.productSpecName}>Subtotal</dt>
                                    <dd className={styles.productSpecValue}>${product.price} x {quantity} = ${product.price * quantity}</dd>
                                </dl>
                                <div className={styles.deleteButtonContainer}>
                                    <Button
                                        theme={ButtonThemes.WARNING}
                                        onClick={e => {
                                            e.preventDefault();
                                            onClickRemoveButton({productId: product.id, quantity});
                                        }}
                                    ><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ) : (
            <div>No Items</div>
        )}
        {order.length > 1 && (
            <nav className={styles.itemRotateButtonContainer}>
                <Button onClick={onClickPrevItemButton} disabled={displayedItemIndex === 0}>&lt;</Button>
                <Button onClick={onClickNextItemButton} disabled={displayedItemIndex === order.length - 1}>&gt;</Button>
            </nav>
        )}
        {order.length > 0 && (
            <Button
                theme={ButtonThemes.ENCOURAGING}
                onClick={onClickCheckOutButton}
                className={styles.checkOutButton}>
                Check Out
            </Button>
        )}
        <button
            className={styles.showButton}
            onClick={e => {e.preventDefault(); onClickToggleButton(e);}}
            title={`${isCartVisible ? 'Hide' : 'Show'} Cart`}>
            <i className="fas fa-shopping-cart"></i>
        </button>
        <button
            className={styles.hideButton}
            onClick={e => {e.preventDefault(); onClickHideButton(e);}}
            title="Hide Cart">
            <i className="fas fa-times"></i>
        </button>
    </div>
);

export default ShopCartPane;