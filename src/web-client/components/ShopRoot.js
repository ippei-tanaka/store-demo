import React from 'react';
import Header from '@/web-client/components/Header';
import Footer from '@/web-client/components/Footer';

export default ({children}) => (
    <div id="ShopRoot">
        <Header />
        {children}
        <Footer />
    </div>
);