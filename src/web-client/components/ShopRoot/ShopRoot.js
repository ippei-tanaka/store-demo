import React from 'react';
import ShopHeaderContainer from '@/web-client/components/ShopHeader';
import ShopCartPane from '@/web-client/components/ShopCartPane';
import styles from '@/web-client/components/ShopRoot/ShopRoot.css';

const ShopRoot = ({children}) => {
    return (
        <div className={styles.background}>
            <div className={styles.layout}>
                <header className={styles.header}>
                    <ShopHeaderContainer />
                </header>
                <main className={styles.main}>
                    {children}
                </main>
                <aside className={styles.cartContainer}>
                    <ShopCartPane />
                </aside>
                <footer className={styles.footer}>
                    <div>&copy; Store Demo</div>
                </footer>
            </div>
        </div>
    );
};

export default ShopRoot;