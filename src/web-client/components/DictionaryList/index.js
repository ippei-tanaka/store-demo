import React from 'react';
import styles from '@/web-client/components/DictionaryList/DictionaryList.css';

export const DL = ({children, className, ...rest}) => (
    <dl className={styles.list + (className ? ' ' + className : '')} {...rest}>
        {children}
    </dl>
);

export const DT = ({children, className, ...rest}) => (
    <dt className={styles.term + (className ? ' ' + className : '')} {...rest}>
        {children}
    </dt>
);

export const DD = ({children, className, ...rest}) => (
    <dd className={styles.describe + (className ? ' ' + className : '')} {...rest}>
        {children}
    </dd>
);
