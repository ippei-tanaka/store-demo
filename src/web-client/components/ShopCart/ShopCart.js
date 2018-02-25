import React from 'react';
import Link from '@/web-client/components/Link';
import {Button, ButtonThemes, ButtonMenu} from '@/web-client/components/Button';
import styles from '@/web-client/components/ShopCart/ShopCart.css';

const ShopCart = ({
    order = [],
    onOrderConfirmed = () => {},
    onClickRemoveButton = () => {},
}) => (
    <form onSubmit={(e) => {e.preventDefault(); onOrderConfirmed();}}>
        <ul className={styles.orderList}>
            {order.map(({product, quantity}) => {
                return (
                    <li key={product.id} className={styles.orderListItem}>
                        <div>
                            <dl className={styles.productSpecList}>
                                <dt className={styles.productSpecName}>Product Name</dt>
                                <dd className={styles.productSpecValue}><Link className={styles.nameLink} href={`/products/${product.id}`}>{product.name}</Link></dd>
                                <dt className={styles.productSpecName}>Subtotal</dt>
                                <dd className={styles.productSpecValue}>${product.price} x {quantity} = ${product.price * quantity}</dd>
                            </dl>
                            <Button
                                theme={ButtonThemes.WARNING}
                                onClick={e => {
                                    e.preventDefault();
                                    onClickRemoveButton({productId: product.id, quantity});
                                }}
                            ><i className="fas fa-trash-alt"></i></Button>
                        </div>
                        {product.imageSrc && (
                            <div><img className={styles.productImage} src={product.imageSrc} /></div>
                        )}
                    </li>
                );
            })}
        </ul>
        <div className={styles.totalContainer}> Total: ${order.reduce((memo, {product, quantity}) => memo + quantity * product.price, 0)}</div>
        <Button
            type="submit"
            theme={ButtonThemes.ENCOURAGING}
            disabled={order.length === 0}>
            Make Order
        </Button>
    </form>
);

export default ShopCart;
