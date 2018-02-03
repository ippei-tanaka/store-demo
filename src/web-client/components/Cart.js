import React from 'react';
import Link from '@/web-client/components/Link';

export default (
    {
        cart = {},
        productList = {}
    }) => {
    return (
        <div>
            <ul>
                {Object.keys(cart).map((productId) => {
                    const amount = cart[productId];
                    const product = productList[productId];
                    return (
                        <li key={product.id}>{product.name} - {amount}</li>
                    );
                })}
            </ul>
            <Link href="/checkout">Check Out</Link>
        </div>
    );
};
