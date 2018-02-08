import React from 'react';
import AdminProductFormContainer from '@/web-client/containers/AdminProductFormContainer';
import AdminProductListContainer from '@/web-client/containers/AdminProductListContainer';

export default ({id} = {}) => (
    <div>
        <h1>Admin Product Manager</h1>
        {/* <AdminProductFormContainer id={id} /> */}
        <AdminProductListContainer />
    </div>
);