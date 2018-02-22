import React from 'react';
import styles from '@/web-client/components/BorderedList/BorderedList.css';

export const BorderedList = ({children, className, ...rest}) => (
    <ul className={styles.adminList + (className ? ' ' + className : '')} {...rest}>
        {children}
    </ul>
);

export const BorderedListItem = ({children, className, ...rest}) => (
    <li className={styles.adminListItem + (className ? ' ' + className : '')} {...rest}>
        <div className={styles.adminListItemContainer}>
            {children}
        </div>
    </li>
);
