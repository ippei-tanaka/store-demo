import React from 'react';
import AppRootContainer from '@/web-client/containers/AppRootContainer';
import ShopRootContainer from '@/web-client/containers/ShopRootContainer';
import AdminRootContainer from '@/web-client/containers/AdminRootContainer';
import HomePage from '@/web-client/components/HomePage';
import ProductDetailPage from '@/web-client/components/ProductDetailPage';
import CheckOutPage from '@/web-client/components/CheckOutPage';
import AdminHomePage from '@/web-client/components/AdminHomePage';
import AdminProductManagerPage from '@/web-client/components/AdminProductManagerPage';

export default [
    {
        path: '',
        async action({next}) {
            const children = await next();
            return (
                <AppRootContainer>
                    {children}
                </AppRootContainer>
            );
        },
        children: [
            {
                path: '/admin',
                async action({next}) {
                    const children = await next();
                    return (
                        <AdminRootContainer>
                            {children}
                        </AdminRootContainer>
                    );
                },
                children: [
                    {
                        path: '',
                        async action() {
                            return (
                                <AdminHomePage/>
                            );
                        },
                    },
                    {
                        path: '/product-manager',
                        async action() {
                            return (
                                <AdminProductManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/products/:id',
                        async action({params}) {
                            return (
                                <AdminProductManagerPage id={params.id}/>
                            );
                        },
                    },
                ],
            },
            {
                path: '',
                async action({next}) {
                    const children = await next();
                    return (
                        <ShopRootContainer>
                            {children}
                        </ShopRootContainer>
                    );
                },
                children: [
                    {
                        path: '',
                        async action() {
                            return (
                                <HomePage/>
                            );
                        },
                    },
                    {
                        path: '/products/:id',
                        async action({params}) {
                            return (
                                <ProductDetailPage id={params.id}/>
                            );
                        },
                    },
                    {
                        path: '/checkout',
                        async action() {
                            return (
                                <CheckOutPage/>
                            );
                        },
                    },
                ],
            },
        ],
    },
];