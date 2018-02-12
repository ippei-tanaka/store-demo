import React from 'react';
import AppRootContainer from '@/web-client/containers/AppRootContainer';
import ShopRootContainer from '@/web-client/containers/ShopRootContainer';
import AdminRootContainer from '@/web-client/containers/AdminRootContainer';
import ShopHomePage from '@/web-client/components/ShopHomePage';
import ShopProductDetailPage from '@/web-client/components/ShopProductDetailPage';
import ShopCartPage from '@/web-client/components/ShopCartPage';
import AdminHomePage from '@/web-client/components/AdminHomePage';
import AdminProductManagerPage from '@/web-client/components/AdminProductManagerPage';
import AdminUserManagerPage from '@/web-client/components/AdminUserManagerPage';

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
                        path: '/user-manager',
                        async action() {
                            return (
                                <AdminUserManagerPage/>
                            );
                        },
                    }
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
                                <ShopHomePage/>
                            );
                        },
                    },
                    {
                        path: '/products/:productId',
                        async action({params}) {
                            return (
                                <ShopProductDetailPage productId={params.productId}/>
                            );
                        },
                    },
                    {
                        path: '/cart',
                        async action() {
                            return (
                                <ShopCartPage/>
                            );
                        },
                    },
                ],
            },
        ],
    },
];