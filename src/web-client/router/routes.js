import React from 'react';
import AppRootContainer from '@/web-client/components/AppRootContainer/index';
import AdminRootContainer from '@/web-client/components/AdminRootContainer/index';
import ShopRootContainer from '@/web-client/components/ShopRootContainer/index';
import ContentLoaderContainer from '@/web-client/components/ContentLoaderContainer/index';
import LoadingPane from '@/web-client/components/LoadingPane/index';

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
                            const AdminHomePage = await import('@/web-client/components/AdminHomePage/index');
                            return (
                                <AdminHomePage/>
                            );
                        },
                    },
                    {
                        path: '/product-manager',
                        async action() {
                            const AdminProductManagerPage = await import('@/web-client/components/AdminProductManagerPage/index');
                            return (
                                <AdminProductManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/user-manager',
                        async action() {
                            const AdminUserManagerPage = await import('@/web-client/components/AdminUserManagerPage/index');
                            return (
                                <AdminUserManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/order-manager',
                        async action() {
                            const AdminOrderManagerPage = await import('@/web-client/components/AdminOrderManagerPage/index');
                            return (
                                <AdminOrderManagerPage/>
                            );
                        },
                    },
                    {
                        path: '/media-manager',
                        async action() {
                            const AdminMediaManagerPage = await import('@/web-client/components/AdminMediaManagerPage/index');
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
                            const ShopHomePage = await import('@/web-client/components/ShopHomePage/index');
                            return (
                                <ShopHomePage/>
                            );
                        },
                    },
                    {
                        path: '/products/:productId',
                        async action({params}) {
                            const ShopProductDetailPage = await import('@/web-client/components/ShopProductDetailPage/index');
                            return (
                                <ShopProductDetailPage productId={params.productId}/>
                            );
                        },
                    },
                    {
                        path: '/cart',
                        async action() {
                            const ShopCartPage = await import('@/web-client/components/ShopCartPage/index');
                            return (
                                <ShopCartPage/>
                            );
                        },
                    },
                    {
                        path: '/thank-you',
                        async action() {
                            const ThankYouPage = await import('@/web-client/components/ThankYouPage/index');
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