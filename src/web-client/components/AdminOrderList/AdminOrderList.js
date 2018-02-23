import React, {Component} from 'react';
import styles from '@/web-client/components/AdminOrderList/AdminOrderList.css';
import {
    BorderedList,
    BorderedListItem,
    BorderedListItemContainer,
    BorderedListItemIndex
} from '@/web-client/components/BorderedList';
import {DL, DT, DD} from '@/web-client/components/DictionaryList';
import {Button, ButtonMenu, ButtonThemes} from '@/web-client/components/Button';

export default class AdminOrderList extends Component {

    onClickDeleteButton (event)
    {
        event.preventDefault();
        const orderId = event.currentTarget.getAttribute('orderid');
        this.props.onDeleteOrder(orderId);
    }

    render ()
    {
        const {orderList} = this.props;
        return (
            <BorderedList>
                {orderList.map((order, index) => (
                    <BorderedListItem key={order.id}>
                        <BorderedListItemContainer>
                            <BorderedListItemIndex index={index + 1} />
                            <div>
                                <div className={styles.specListContainer}>
                                    <DL>
                                        <DT>Customer</DT>
                                        <DD>{order.user.name}</DD>
                                        <DT>Order</DT>
                                        <DD>
                                            <ol>
                                                {order.items.map((orderItem, index) => (
                                                    <li key={order.id + '-' + index}>
                                                        {orderItem.product.name}
                                                        <span className={styles.orderItemListItemSeparator}>x</span>
                                                        {orderItem.quantity}
                                                    </li>
                                                ))}
                                            </ol>
                                        </DD>
                                    </DL>
                                </div>
                                <ButtonMenu>
                                    <Button
                                        onClick={this.onClickDeleteButton.bind(this)}
                                        orderid={order.id}
                                        title="Delete"
                                        theme={ButtonThemes.WARNING}
                                    ><i className="fas fa-trash"></i></Button>
                                </ButtonMenu>
                            </div>
                        </BorderedListItemContainer>
                    </BorderedListItem>
                ))}
            </BorderedList>
        );
    }
}

