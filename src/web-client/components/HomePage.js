import React from 'react';
import ProductListContainer from '@/web-client/containers/ProductListContainer';

export default () => (
    <div id="HomePage">
        <h1>Home Page</h1>
        <p>This is our home page.</p>
        <p>Check out our products below.</p>
        <ProductListContainer/>
    </div>
);