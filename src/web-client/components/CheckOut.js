import React from 'react';
import CheckoutContainer from '@/web-client/containers/CheckoutContainer';
import LoginFormContainer from '@/web-client/containers/LoginFormContainer';

export default (
    {
        user,
        cart = {},
        productList = {},
        onOrderConfirmed = () => {},
    }) => {
    const productIds = Object.keys(cart);
    return (
        <div>
            {user ? (
                <div>
                    <ul>
                        {productIds.map((id) => {
                            const amount = cart[id];
                            const product = productList[id];
                            return (
                                <li key={product.id}>{product.name} - {amount}</li>
                            );
                        })}
                    </ul>
                    <p> Sum: ${productIds.reduce((memo, id) => {
                        const amount = cart[id];
                        const product = productList[id];
                        return memo + amount * product.price;
                    }, 0)}</p>
                    <button onClick={e => {
                        e.preventDefault();
                        onOrderConfirmed();
                    }}>Order
                    </button>
                </div>
            ) : (
                <LoginFormContainer/>
            )}
        </div>
    );
};
