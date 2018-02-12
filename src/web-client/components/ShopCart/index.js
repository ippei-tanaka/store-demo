import React, {Component} from 'react';
import Link from '@/web-client/components/Link';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';
import styles from '@/web-client/components/ShopCart/style.css';

export default class ShopHeader extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            orderPlaced: false
        };
    }

    componentDidMount ()
    {
        this.setState({orderPlaced: false});
    }

    render ()
    {
        const {
            order = [],
            onOrderConfirmed = () => {},
            isLoggedIn
        } = this.props;

        if (!isLoggedIn)
        {
            return (
                <div>
                    <LoginFormContainer/>
                </div>
            );
        }

        return !this.state.orderPlaced ? (
            <div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>Product Name</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Subtotal</td>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={styles.totalContainer}> Total: ${order.reduce((memo, {product, quantity}) => memo + quantity * product.price, 0)}</div>
                <button className={styles.orderButton} onClick={e => {
                    e.preventDefault();
                    onOrderConfirmed();
                    this.setState({orderPlaced: true});
                }}>Make Order
                </button>
            </div>
        ) : (
            <div className={styles.thankYouPane}>
                Thank you for shopping!
            </div>
        );
    }
}
