import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminOrderList from '@/web-client/components/AdminOrderList/AdminOrderList';
import {
    loadAdminOrderList,
    loadAdminUserList,
    loadAdminProductList,
    deleteOrder
} from '@/web-client/actions/admin';

class AdminProductListContainer extends Component
{
    componentDidMount ()
    {
        this.props.dispatch(loadAdminOrderList());
        this.props.dispatch(loadAdminUserList());
        this.props.dispatch(loadAdminProductList());
    }

    render ()
    {
        const {
            admin: {
                adminUserList: userList,
                adminOrderList: orderList,
                adminProductList: productList,
            },
            dispatch
        } = this.props;

        const _orderList = orderList.map(order => {
            return Object.assign({}, order, {
                user: userList.find(u => u.id === order.userId) || {name: '(Not Found)'},
                items: order.items.map(item => Object.assign({}, item, {
                    product: productList.find(p => p.id === item.productId) || {name: '(Not Found)'}
                }))
            });
        });

        return (
            <AdminOrderList
                orderList={_orderList}
                onDeleteOrder={id => {
                    dispatch(deleteOrder(id));
                }}
            />
        );
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminProductListContainer);

