import React from 'react';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/AdminNavigation/style.css';
import LogoutButtonContainer from '@/web-client/containers/LogoutButtonContainer';

export default ({focusable = true}) => {
    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Link href="/admin" className={styles.link} tabIndex={focusable ? '0' : '-1'}>
                            <span className={styles.linkIconContainer}><i className="fas fa-home"></i></span>
                            <span className={styles.linkText}>Admin Home</span>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/admin/product-manager" className={styles.link} tabIndex={focusable ? '0' : '-1'}>
                            <span className={styles.linkIconContainer}><i className="fas fa-cube"></i></span>
                            <span className={styles.linkText}>Product Manager</span>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/admin/user-manager" className={styles.link} tabIndex={focusable ? '0' : '-1'}>
                            <span className={styles.linkIconContainer}><i className="fas fa-user"></i></span>
                            <span className={styles.linkText}>User Manager</span>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/" className={styles.link} tabIndex={focusable ? '0' : '-1'}>
                            <span className={styles.linkIconContainer}><i className="fas fa-link"></i></span>
                            <span className={styles.linkText}>Shop Home</span>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <LogoutButtonContainer className={styles.link} tabIndex={focusable ? '0' : '-1'}>
                            <span className={styles.linkIconContainer}><i className="fas fa-sign-out-alt"></i></span>
                            <span className={styles.linkText}>Logout</span>
                        </LogoutButtonContainer>
                    </li>
                </ul>
            </nav>
        </div>
    );
}