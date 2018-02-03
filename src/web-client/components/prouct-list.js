import React from 'react';
import Link from '@/web-client/components/link';

export default ({productList}) => (
    <ul>
        {productList.map(product => (
            <li key={product.id}>
                <Link href={`/products/${product.id}`}>
                    {product.name}
                </Link>
            </li>
        ))}
    </ul>
);