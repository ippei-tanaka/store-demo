import React, {Component} from 'react';
import styles from '@/web-client/components/AdminOrderList/AdminOrderList.css';
import {
    BorderedList,
    BorderedListItem,
    BorderedListItemContainer,
    BorderedListItemIndex
} from '@/web-client/components/BorderedList';
import {DL, DT, DD} from '@/web-client/components/DictionaryList';

export default class AdminOrderList extends Component {
    render ()
    {
        const {orderList} = this.props;
        return (
            <BorderedList>
                {orderList.map((order, index) => (
                    <BorderedListItem key={order.id}>
                        <BorderedListItemContainer>
                            <BorderedListItemIndex index={index + 1} />
                            <DL>
                                <DT>Customer</DT>
                                <DD>{order.user.name}</DD>
                                <DT>Order</DT>
                                <DD>
                                    <ol className={styles.orderItemList}>
                                        {order.items.map((orderItem, index) => (
                                            <li className={styles.orderItemListItem}
                                                key={order.id + '-' + index}>
                                                {orderItem.product.name}
                                                <span className={styles.orderItemListItemSeparator}>x</span>
                                                {orderItem.quantity}
                                            </li>
                                        ))}
                                    </ol>
                                </DD>
                            </DL>
                        </BorderedListItemContainer>
                    </BorderedListItem>
                ))}
            </BorderedList>
        );
    }
}

