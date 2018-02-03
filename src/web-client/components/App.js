import React from 'react';
import HeaderContainer from '@/web-client/containers/HeaderContainer';
import Footer from '@/web-client/components/Footer';

export default ({children}) => (
    <div>
        <HeaderContainer/>
        {children}
        <Footer/>
    </div>
);