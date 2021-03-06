import React from 'react';
import Link from '@/web-client/components/Link';

const AdminHomePage = () => {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <p>Thank you for coming to Store Demo.</p>
            <p>Please check out <Link href="/">the shopping site</Link> as well.</p>
        </div>
    );
};

export default AdminHomePage;