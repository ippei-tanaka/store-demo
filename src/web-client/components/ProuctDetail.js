import React from 'react';

export default ({product, onClickBuyButton}) => (
    <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={(e) => {
            e.preventDefault();
            onClickBuyButton(e);
        }}>Add to Cart
        </button>
    </div>
);