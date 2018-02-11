import React from 'react';
import Logo from '@/web-client/components/Logo';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/ShopRoot/style.css';

export default ({children}) => {
    return (
        <div>
            <header className={styles.header}>
                <Link href="/" className={styles.logoLink} title="Store Demo">
                    <Logo/>
                </Link>
                <menu className={styles.menu}>
                    <li className={styles.menuItem}>
                        <button className={styles.menuButton} title="Login">
                            <i className="fas fa-user"></i>
                            <span className={styles.menuButtonText}>Login</span>
                        </button>
                    </li>
                    <li className={styles.menuItem}>
                        <button className={styles.menuButton} title="Checkout">
                            <i className="fas fa-shopping-cart"></i>
                            <span className={styles.menuButtonText}>Checkout</span>
                        </button>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/admin" className={styles.menuButton} title="Admin Site">
                            <i className="fas fa-link"></i>
                            <span className={styles.menuButtonText}>Admin Site</span>
                        </Link>
                    </li>
                </menu>
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