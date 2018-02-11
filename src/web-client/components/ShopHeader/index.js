import React, {Component} from 'react';
import Link from '@/web-client/components/Link';
import styles from '@/web-client/components/ShopHeader/style.css';
import Bubble from '@/web-client/components/Bubble';
import debounce from 'lodash/debounce';

export default class ShopHeader extends Component {

    constructor (props)
    {
        super(props);
        this.state = {};
        this.bubble = null;
    }

    componentDidMount ()
    {
        this.bubble.addEventListener('transitionend', debounce(() => {
            setTimeout(() => {
                this.bubble.classList.add(styles.bubbleHidden);
            }, 1000);

            if (this.bubble.classList.contains(styles.bubbleHidden))
            {
                this.onBubbleDisappear();
            }
        }, 100));

        const isEmpty = /^\s*$/.test(this.bubble.getAttribute('text'));

        if (!isEmpty) {
            setTimeout(() => {
                this.bubble.classList.add(styles.bubbleHidden);
            }, 1000);
        }
    }

    render ()
    {
        const {
            bubbleTextOnCartButton = '',
            onBubbleTextDisappear = () => {}
        } = this.props;

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
                        <button className={styles.menuButton} title="Cart">
                            <i className="fas fa-shopping-cart"></i>
                            <span className={styles.menuButtonText}>Cart</span>
                        </button>
                        <span
                            ref={e => {
                                this.bubble = e;
                                this.onBubbleDisappear = onBubbleTextDisappear;
                            }}
                            className={styles.bubbleContainer + ' ' + (bubbleTextOnCartButton ? '' : styles.bubbleHidden)}
                            text={bubbleTextOnCartButton}
                        >
                            <Bubble>{bubbleTextOnCartButton}</Bubble>
                        </span>
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
    }
}
