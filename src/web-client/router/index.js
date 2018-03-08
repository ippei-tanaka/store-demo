import {buildRouter} from 'router404';
import React from 'react';
import AppRootContainer from '@/web-client/components/AppRoot';
import AdminRootContainer from '@/web-client/components/AdminRoot';
import ShopRootContainer from '@/web-client/components/ShopRoot';
import ContentLoaderContainer from '@/web-client/components/ContentLoaderContainer';
import LoadingPane from '@/web-client/components/LoadingPane';
import ShopLoadingPane from '@/web-client/components/ShopLoadingPane';

const rootRouter = buildRouter({
    ['/' + (basename ? basename + '/' : '') + '*']: ({wildcards}) => {
        gtag('config', 'UA-2990082-9', {'page_path': '/' + wildcards[0]});
        gtag('event', 'page_view', { 'send_to': 'UA-2990082-9' });
        return (
            <AppRootContainer>
                {contentRootRouter(wildcards[0])}
            </AppRootContainer>
        );
    },
});

const contentRootRouter = buildRouter({
    '/admin/*': ({wildcards}) => {
        return (
            <ContentLoaderContainer
                contentPromise={adminContentRouter(wildcards[0])}
                loadingContent={<LoadingPane/>}>
                {({content}) => (
                    <AdminRootContainer>
                        {content}
                    </AdminRootContainer>
                )}
            </ContentLoaderContainer>
        );
    },
    '/*': ({wildcards}) => {
        return (
            <ContentLoaderContainer
                contentPromise={shopContentRouter(wildcards[0])}
                loadingContent={<ShopLoadingPane/>}>
                {({content}) => (
                    <ShopRootContainer>
                        {content}
                    </ShopRootContainer>
                )}
            </ContentLoaderContainer>
        );
    },
});

const shopContentRouter = buildRouter({
    '/': async () => {
        const ShopHomePage = await import('@/web-client/components/ShopHomePage');
        return (
            <ShopHomePage/>
        );
    },
    '/products': async () => {
        const ShopProductListPage = await import('@/web-client/components/ShopProductListPage');
        return (
            <ShopProductListPage/>
        );
    },
    '/products/:productId': async ({params}) => {
        const ShopProductDetailPage = await import('@/web-client/components/ShopProductDetailPage');
        return (
            <ShopProductDetailPage productId={params.productId}/>
        );
    },
    '/cart': async () => {
        const ShopCartPage = await import('@/web-client/components/ShopCartPage');
        return (
            <ShopCartPage/>
        );
    },
    '/thank-you': async () => {
        const ShopThankYouPage = await import('@/web-client/components/ShopThankYouPage');
        return (
            <ShopThankYouPage/>
        );
    },
    '/*': async () => {
        const ShopNotFoundPage = await import('@/web-client/components/ShopNotFoundPage');
        return (
            <ShopNotFoundPage/>
        );
    },
});

const adminContentRouter = buildRouter({
    '/': async () => {
        const AdminHomePage = await import('@/web-client/components/AdminHomePage');
        return (
            <AdminHomePage/>
        );
    },
    '/product-manager': async () => {
        const AdminProductManagerPage = await import('@/web-client/components/AdminProductManagerPage');
        return (
            <AdminProductManagerPage/>
        );
    },
    '/user-manager': async () => {
        const AdminUserManagerPage = await import('@/web-client/components/AdminUserManagerPage');
        return (
            <AdminUserManagerPage/>
        );
    },
    '/order-manager': async () => {
        const AdminOrderManagerPage = await import('@/web-client/components/AdminOrderManagerPage');
        return (
            <AdminOrderManagerPage/>
        );
    },
    '/medium-manager': async () => {
        const AdminMediaManagerPage = await import('@/web-client/components/AdminMediumManagerPage');
        return (
            <AdminMediaManagerPage/>
        );
    },
    '/*': async () => {
        const AdminNotFoundPage = await import('@/web-client/components/AdminNotFoundPage');
        return (
            <AdminNotFoundPage/>
        );
    },
});

export const basename = '';

export default rootRouter;