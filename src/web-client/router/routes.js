import React from 'react';
import AppRootContainer from '@/web-client/components/AppRootContainer';
import AdminRootContainer from '@/web-client/components/AdminRootContainer';
import ShopRootContainer from '@/web-client/components/ShopRootContainer';
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