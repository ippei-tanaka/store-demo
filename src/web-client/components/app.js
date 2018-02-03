import React from 'react';
import AuthHeader from '@/web-client/containers/auth-header';
import Footer from '@/web-client/components/footer';

export default ({children}) => (
    <div>
        <AuthHeader/>
        {children}
        <Footer/>
    </div>
);