import React, {Component} from 'react';
import Link from '@/web-client/components/Link';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import styles from '@/web-client/components/ShopCart/style.css';

export default class ShopHeader extends Component {

    render ()
    {
        const {
            order = [],
            onOrderConfirmed = () => {},
            onClickRemoveButton = () => {},
            isLoggedIn
        } = this.props;

        if (!isLoggedIn)
        {
            return (
                <div>
                    <p className={styles.loginMessage}>Please login to check out.</p>
                    <LoginFormContainer/>
                </div>
            );
        }

        return (
            <form onSubmit={(e) => {e.preventDefault(); onOrderConfirmed();}}>
                <ul className={styles.orderList}>
                    {order.map(({product, quantity}) => {
                        return (
                            <li key={product.id} className={styles.orderListItem}>
                                <dl className={styles.productSpecList}>
                                    <dt className={styles.productSpecName}>Product Name</dt>
                                    <dd className={styles.productSpecValue}><Link className={styles.nameLink} href={`/products/${product.id}`}>{product.name}</Link></dd>
                                    <dt className={styles.productSpecName}>Subtotal</dt>
                                    <dd className={styles.productSpecValue}>${product.price} x {quantity} = ${product.price * quantity}</dd>
                                </dl>
                                <div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={e => {
                                            e.preventDefault();
                                            onClickRemoveButton({productId: product.id, quantity});
                                        }}
                                    ><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.totalContainer}> Total: ${order.reduce((memo, {product, quantity}) => memo + quantity * product.price, 0)}</div>
                <button type="submit" className={styles.orderButton} disabled={order.length === 0}>Make Order</button>
            </form>
        );
    }
}
