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
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>Product Name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Subtotal</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map(({product, quantity}) => {
                                return (
                                    <tr key={product.id}>
                                        <td><Link className={styles.nameLink} href={`/products/${product.id}`}>{product.name}</Link></td>
                                        <td>${product.price}</td>
                                        <td>{quantity}</td>
                                        <td>${product.price * quantity}</td>
                                        <td>
                                            <button
                                                className={styles.removeButton}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    onClickRemoveButton({productId: product.id, quantity});
                                                }}
                                            ><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={styles.totalContainer}> Total: ${order.reduce((memo, {product, quantity}) => memo + quantity * product.price, 0)}</div>
                <button type="submit" className={styles.orderButton} disabled={order.length === 0}>Make Order</button>
            </form>
        );
    }
}
