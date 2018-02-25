import React from 'react';
import ShopCart from '@/web-client/components/ShopCart';
import styles from '@/web-client/components/ShopCartPane/ShopCartPane.css';

const ShopCartPane = ({isCartVisible, onClickHideButton, onClickShowButton}) => (
    <div className={styles.container + (isCartVisible ? '' : ' ' + styles.hidden)}>
        <button
            className={styles.showButton}
            onClick={e => {e.preventDefault(); onClickShowButton(e);}}
            title="Show Cart">
            <i className="fas fa-shopping-cart"></i>
        </button>
        <ShopCart/>
        <button
            className={styles.hideButton}
            onClick={e => {e.preventDefault(); onClickHideButton(e);}}
            title="Hide Cart">
            <i className="fas fa-times"></i>
        </button>
    </div>
);

export default ShopCartPane;