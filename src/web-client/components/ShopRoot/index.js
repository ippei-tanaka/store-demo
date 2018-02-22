import React from 'react';
import ShopHeaderContainer from '@/web-client/components/ShopHeaderContainer/index';
import styles from '@/web-client/components/ShopRoot/ShopRoot.css';

const ShopRoot = ({children}) => {
    return (
        <div>
            <header>
                <ShopHeaderContainer />
            </header>
            <div className={styles.bodyContent}>
                {children}
            </div>
            <footer className={styles.footer}>
                <div>&copy; Store Demo <span className={styles.iconContainer}><i className="fas fa-bolt"></i></span></div>
            </footer>
        </div>
    );
};

export default ShopRoot;