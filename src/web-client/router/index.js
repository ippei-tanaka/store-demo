import React from 'react';
import UniversalRouter from 'universal-router';
import App from '@/web-client/components/App';
import ProductListNav from '@/web-client/containers/product-list-nav';
import ProductDetail from '@/web-client/containers/connected-product-detail';

export const basename = '';

const routes =
    [
        {
            path: '/',
            action({pathname, params}) {
                return {
                    pathname,
                    params,
                    createComponent() {
                        return (
                            <App>
                                <h2>Home</h2>
                                <ProductListNav/>
                            </App>
                        );
                    },
                };
            },
        },
        {
            path: '/products/:id',
            action({pathname, params}) {
                return {
                    pathname,
                    params,
                    createComponent() {
                        return (
                            <App>
                                <h2>Product Detail</h2>
                                <ProductListNav/>
                                <ProductDetail productId={params.id}/>
                            </App>
                        );
                    },
                };
            },
        },
    ];

const options = {
    baseUrl: basename,
};

const router = new UniversalRouter(routes, options);

export default router;