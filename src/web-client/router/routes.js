import React from 'react';
import AppRootContainer from '@/web-client/components/AppRoot';
import AdminRootContainer from '@/web-client/components/AdminRoot';
import ShopRootContainer from '@/web-client/components/ShopRoot';
import ContentLoaderContainer from '@/web-client/components/ContentLoaderContainer';
import LoadingPane from '@/web-client/components/LoadingPane';

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
                    return (
                        <ContentLoaderContainer contentPromise={next()} loadingContent={<LoadingPane />}>
                            {({content}) => (
                                <AdminRootContainer>
                                    {content}
                                </AdminRootContainer>
                            )}
                        </ContentLoaderContainer>
                    );
                },
                children: [
                    {
                        path: '',
                        async action() {
                            const AdminHomePage = await import('@/web-client/components/AdminHomePage');
                            return (
                                <AdminHomePage/>
                            );
                        },
                    },
                    {
                        path: '/product-manager',
                        async action() {
                            const AdminProductManagerPage = await import('@/web-client/components/AdminProductManagerPage');
                            return (
                                <AdminProductManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/user-manager',
                        async action() {
                            const AdminUserManagerPage = await import('@/web-client/components/AdminUserManagerPage');
                            return (
                                <AdminUserManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/order-manager',
                        async action() {
                            const AdminOrderManagerPage = await import('@/web-client/components/AdminOrderManagerPage');
                            return (
                                <AdminOrderManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/medium-manager',
                        async action() {
                            const AdminMediaManagerPage = await import('@/web-client/components/AdminMediumManagerPage');
                            return (
                                <AdminMediaManagerPage/>
                            );
                        },
                    }
                ],
            },
            {
                path: '',
                async action({next}) {
                    return (
                        <ContentLoaderContainer contentPromise={next()} loadingContent={<LoadingPane />}>
                            {({content}) => (
                                <ShopRootContainer>
                                    {content}
                                </ShopRootContainer>
                            )}
                        </ContentLoaderContainer>
                    );
                },
                children: [
                    {
                        path: '',
                        async action() {
                            const ShopHomePage = await import('@/web-client/components/ShopHomePage');
                            return (
                                <ShopHomePage/>
                            );
                        },
                    },
                    {
                        path: '/products/:productId',
                        async action({params}) {
                            const ShopProductDetailPage = await import('@/web-client/components/ShopProductDetailPage');
                            return (
                                <ShopProductDetailPage productId={params.productId}/>
                            );
                        },
                    },
                    {
                        path: '/cart',
                        async action() {
                            const ShopCartPage = await import('@/web-client/components/ShopCartPage');
                            return (
                                <ShopCartPage/>
                            );
                        },
                    },
                    {
                        path: '/thank-you',
                        async action() {
                            const ThankYouPage = await import('@/web-client/components/ThankYouPage');
                            return (
                                <ThankYouPage/>
                            );
                        },
                    },
                ],
            },
        ],
    },
];