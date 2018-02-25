import React from 'react';
import styles from '@/web-client/components/ShopLoadingPane/ShopLoadingPane.css';
import LoadingPane from '@/web-client/components/LoadingPane';

const ShopLoadingPane = () => (
    <div className={styles.layout}>
        <div className={styles.container} >
            <LoadingPane className={styles.loadingPane} />
        </div>
    </div>
);

export default ShopLoadingPane;