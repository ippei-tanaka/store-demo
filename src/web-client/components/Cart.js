import React from 'react';
import Link from '@/web-client/components/Link';

export default (
    {
        cart = {},
        productList = {},
        onClickRemove = () => {},
    }) => {
    return (
        <div>
            <ul>
                {Object.keys(cart).map((productId) => {
                    const quantity = cart[productId];
                    const product = productList[productId];
                    return (
                        <li key={product.id}>
                            {product.name} - {quantity} :
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    onClickRemove({id:product.id});
                                }}>
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ul>
            <Link href="/checkout">Check Out</Link>
        </div>
    );
};
