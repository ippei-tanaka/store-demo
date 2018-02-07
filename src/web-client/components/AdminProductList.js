import React from 'react';
import Link from '@/web-client/components/Link';

export default ({productList}) => (
    <table>
        <thead>
            <tr>
                <th></th>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {productList.map((product, index) => {
                return (
                    <tr key={product.id}>
                        <th>#{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td><Link href={`/admin/products/${product.id}`}>Edit</Link></td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);