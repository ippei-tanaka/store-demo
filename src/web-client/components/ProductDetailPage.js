import React from 'react';
import ProductDetailContainer from '@/web-client/containers/ProductDetailContainer';
import CartContainer from '@/web-client/containers/CartContainer';

export default ({id}) => (
    <div id="ProductDetailPage">
        <h1>Product Detail Page</h1>
        <CartContainer/>
        <ProductDetailContainer productId={id}/>
    </div>
);