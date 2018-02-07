import React from 'react';

export default ({productList}) => (
    <table>
        <thead>
            <tr>
                <th></th>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
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
                    </tr>
                );
            })}
        </tbody>
    </table>
);