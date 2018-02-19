import React, {Component} from 'react';
import styles from '@/web-client/components/AdminOrderList.css';

export default class AdminOrderList extends Component {
    render ()
    {
        const {orderList} = this.props;
        return (
            <div>
                <ul className={styles.orderList}>
                    {orderList.map((order, index) => (
                        <li className={styles.orderListItem} key={order.id}>
                            <span className={styles.orderNumber}>#{index + 1}</span>
                            <dl className={styles.orderDetailList}>
                                <dt className={styles.orderFieldName}>Customer</dt>
                                <dd className={styles.orderFieldValue}>{order.user.name}</dd>
                                <dt className={styles.orderFieldName}>Order</dt>
                                <dd className={styles.orderFieldValue}>
                                    <ol className={styles.orderItemList}>
                                        {order.items.map((orderItem, index) => (
                                            <li className={styles.orderItemListItem}
                                                key={order.id + '-' + index}>
                                                <span className={styles.orderItemListItemIndex}>{index + 1}.</span>
                                                {orderItem.product.name}
                                                <span className={styles.orderItemListItemSeparator}>x</span>
                                                {orderItem.quantity}
                                            </li>
                                        ))}
                                    </ol>
                                </dd>
                            </dl>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

