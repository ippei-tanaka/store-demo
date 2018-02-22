import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminOrderList from '@/web-client/components/AdminOrderList/index';
import LoadingPane from '@/web-client/components/LoadingPane/index';
import {
    loadAdminOrderList,
    loadAdminUserList,
    loadAdminProductList,
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
            }
        } = this.props;

        if (orderList.length === 0
            || userList.length === 0
            || productList.length === 0)
        {
            return <LoadingPane />;
        }

        const _orderList = orderList.map(order => {
            return Object.assign({}, order, {
                user: userList.find(u => u.id === order.userId) || {name: 'Not Found'},
                items: order.items.map(item => Object.assign({}, item, {
                    product: productList.find(p => p.id === item.productId) || {name: 'Not Found'}
                }))
            });
        });

        return <AdminOrderList orderList={_orderList}/>;
    }
}

export default connect(s => s, dispatch => ({dispatch}))(AdminProductListContainer);

