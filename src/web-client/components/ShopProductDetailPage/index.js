import React from 'react';
import ProductDetailContainer from '@/web-client/containers/ShopProductDetailContainer';

export default ({productId}) => (
    <div>
        <ProductDetailContainer productId={productId}/>
    </div>
);