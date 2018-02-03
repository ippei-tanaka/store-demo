import React from 'react';
import AuthHeader from '@/web-client/containers/HeaderContainer';
import Footer from '@/web-client/components/Footer';

export default ({children}) => (
    <div>
        <AuthHeader/>
        {children}
        <Footer/>
    </div>
);