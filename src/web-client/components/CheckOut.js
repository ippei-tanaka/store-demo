import React from 'react';
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
                            const quantity = cart[id];
                            const product = productList[id];
                            return (
                                <li key={product.id}>{product.name} - {quantity}</li>
                            );
                        })}
                    </ul>
                    <p> Sum: ${productIds.reduce((memo, id) => {
                        const quantity = cart[id];
                        const product = productList[id];
                        return memo + quantity * product.price;
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
