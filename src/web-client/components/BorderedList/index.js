import React from 'react';
import styles from '@/web-client/components/BorderedList/BorderedList.css';

export const BorderedList = ({children, className, ...rest}) => (
    <ul className={styles.list + (className ? ' ' + className : '')} {...rest}>
        {children}
    </ul>
);

export const BorderedListItem = ({children, className, ...rest}) => (
    <li className={styles.listItem + (className ? ' ' + className : '')} {...rest}>
        {children}
    </li>
);

export const BorderedListItemContainer = ({children, className, ...rest}) => (
    <div className={styles.listItemContainer + (className ? ' ' + className : '')} {...rest}>
        {children}
    </div>
);

export const BorderedListItemIndex = ({index}) => (
    <span className={styles.listItemIndex}>
        {index}
    </span>
);
