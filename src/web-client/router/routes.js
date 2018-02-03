import React from 'react';
import App from '@/web-client/components/App';
import ProductListContainer from '@/web-client/containers/ProductListContainer';
import ProductDetailContainer from '@/web-client/containers/ProductDetailContainer';

export default [
    {
        path: '/',
        async action() {
            return {
                createComponent() {
                    return (
                        <App>
                            <h2>Home</h2>
                            <ProductListContainer/>
                        </App>
                    );
                },
            };
        },
    },
    {
        path: '/products/:id',
        async action({params}) {
            return {
                createComponent() {
                    return (
                        <App>
                            <h2>Product Detail</h2>
                            <ProductListContainer/>
                            <ProductDetailContainer productId={params.id}/>
                        </App>
                    );
                },
            };
        },
    },
];