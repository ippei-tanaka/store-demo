import React from 'react';
import styles from '@/web-client/components/AdminHeader/style.css';

export default ({onClickToggle = () => {}}) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button
                    className={styles.toggleButton}
                    onClick={e => {e.preventDefault(); onClickToggle();}}
                >
                    <span className={styles.showIconContainer}><i
                        className="fas fa-bars"></i></span>
                    <span className={styles.toggleText}>Toggle Menu</span>
                </button>
            </header>
        </div>
    );
}
