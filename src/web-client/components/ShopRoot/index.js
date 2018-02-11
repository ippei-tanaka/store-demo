import React from 'react';
import ShopHeaderContainer from '@/web-client/containers/ShopHeaderContainer';
import styles from '@/web-client/components/ShopRoot/style.css';

export default ({children}) => {
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