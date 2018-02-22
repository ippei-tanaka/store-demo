import React from 'react';
import styles from '@/web-client/components/Button/Button.css';

const getThemeClassName = (theme) => {
    switch (theme)
    {
    case ButtonThemes.ENCOURAGING:
        return styles.encouraging;
    case ButtonThemes.WARNING:
        return styles.warning;
    default:
        return styles.neutral;
    }
};

export const Button = ({children, theme, className, ...rest}) => (
    <button className={styles.button + ' ' + getThemeClassName(theme) + (className ? ' ' + className : '')} {...rest}>
        {children}
    </button>
);

export const ButtonThemes = Object.freeze({
    ENCOURAGING: Symbol('ENCOURAGING'),
    WARNING: Symbol('WARNING'),
    NEUTRAL: Symbol('NEUTRAL')
});

export const ButtonMenu = ({children, className, ...rest}) => (
    <div className={styles.buttonContainer + (className ? ' ' + className : '')} {...rest}>
        {children}
    </div>
);