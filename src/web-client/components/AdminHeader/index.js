import React from 'react';
import styles from '@/web-client/components/AdminHeader/style.css';
import Link from '@/web-client/components/Link';

const AdminHeader = ({onClickToggle = () => {}, isLoggedIn}) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button
                    className={styles.toggleButton + ' ' + (isLoggedIn ? '' : styles.hidden)}
                    onClick={e => {e.preventDefault(); onClickToggle();}}
                    title="Toggle Navigation"
                >
                    <span>
                        <span className={styles.showIconContainer}><i className="fas fa-bars"></i></span>
                        <span className={styles.toggleText}>Toggle Menu</span>
                    </span>
                </button>
                <Link href="/" className={styles.linkContainer}>
                    <span className={styles.linkIconContainer}><i className="fas fa-link"></i></span>
                    <span className={styles.linkText}>Shopping Site</span>
                </Link>
            </header>
        </div>
    );
};

export default AdminHeader;
