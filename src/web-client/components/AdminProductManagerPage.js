import React from 'react';
import AdminProductFormContainer from '@/web-client/containers/AdminProductFormContainer';
import AdminProductListContainer from '@/web-client/containers/AdminProductListContainer';

export default ({id} = {}) => (
    <div id="AdminHomePage">
        <h2>Admin Product Manager</h2>
        <AdminProductFormContainer id={id} />
        <AdminProductListContainer />
    </div>
);