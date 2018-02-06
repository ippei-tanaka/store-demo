import React from 'react';
import AdminLoginFormPage from '@/web-client/components/AdminLoginFormPage';
import {permissions} from '@/web-client/auth';

export default ({children, user}) => {
    const isAdmin = user && user.permissions.indexOf(permissions.ADMIN) !== -1;
    return (
        <div id="AdminRoot">
            {isAdmin ? children : <AdminLoginFormPage/>}
        </div>
    );
}