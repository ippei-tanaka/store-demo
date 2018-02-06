import React from 'react';
import ShopRoot from '@/web-client/components/ShopRoot';
import AdminRootContainer from '@/web-client/containers/AdminRootContainer';
import HomePage from '@/web-client/components/HomePage';
import ProductDetailPage from '@/web-client/components/ProductDetailPage';
import CheckOutPage from '@/web-client/components/CheckOutPage';
import AdminHomePage from '@/web-client/components/AdminHomePage';

export default [
    {
        path: '/',
        async action() {
            return (
                <ShopRoot>
                    <HomePage/>
                </ShopRoot>
            );
        },
    },
    {
        path: '/products/:id',
        async action({params}) {
            return (
                <ShopRoot>
                    <ProductDetailPage id={params.id}/>
                </ShopRoot>
            );
        },
    },
    {
        path: '/checkout',
        async action() {
            return (
                <ShopRoot>
                    <CheckOutPage/>
                </ShopRoot>
            );
        },
    },
    {
        path: '/admin',
        async action({next}) {
            const child = await next();
            return (
                <AdminRootContainer>{child}</AdminRootContainer>
            );
        },
        children: [{
            path: '',
            async action() {
                return (
                    <AdminHomePage/>
                );
            },
        }]
    },
];