import React from 'react';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/ShopHeader/style.css';

export default () => {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logoLink} title="Store Demo">
                <span className={styles.logoContainer}>
                    <span className={styles.logoIconContainer}><i className="fas fa-bolt"></i></span>
                    <span className={styles.logoText}>Store Demo</span>
                </span>
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
        </div>
    );
};