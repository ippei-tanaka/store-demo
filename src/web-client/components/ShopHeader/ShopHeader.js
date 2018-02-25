import React, {Component} from 'react';
import Link from '@/web-client/components/Link';
import LogoutButtonContainer from '@/web-client/components/LogoutButton';
import styles from '@/web-client/components/ShopHeader/ShopHeader.css';
//import Bubble from '@/web-client/components/Bubble';
//import debounce from 'lodash/debounce';

export default class ShopHeader extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            isModalMenuOpen: false
        };
    }

    componentDidMount ()
    {
        /*
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
        */
    }

    _onClickShowModalMenuButton (e)
    {
        e.preventDefault();
        this.setState({isModalMenuOpen: true});
    }

    _onClickCloseModalMenuButton (e)
    {
        e.preventDefault();
        this.setState({isModalMenuOpen: false});
    }

    _onClickMenuButton (e)
    {
        e.preventDefault();
        this.setState({isModalMenuOpen: false});
    }

    render ()
    {
        const {
            //bubbleTextOnCartButton = '',
            //onBubbleTextDisappear = () => {},
            showLogoutButton
        } = this.props;

        const {
            isModalMenuOpen
        } = this.state;

        return (
            <div className={styles.container}>
                <Link
                    href="/"
                    className={styles.logoLink}
                    onClick={this._onClickMenuButton.bind(this)}
                    title="Store Demo">
                    <span className={styles.logoText}>Store Demo</span>
                </Link>
                <div className={styles.menuContainer}>
                    <button
                        className={styles.showMenuButton}
                        onClick={this._onClickShowModalMenuButton.bind(this)}
                        title="Show Menu">
                        <i className="fas fa-bars"></i>
                    </button>
                    <button
                        className={styles.closeMenuButton + (isModalMenuOpen ? ' ' + styles.modalMenuCloseButtonOpen : '')}
                        onClick={this._onClickCloseModalMenuButton.bind(this)}
                        title="Close Menu">
                        <i className="fas fa-times"></i>
                    </button>
                    <menu className={styles.menu + (isModalMenuOpen ? ' ' + styles.modalMenuOpen : '')}>
                        <li className={styles.menuItem}>
                            <Link
                                href="/"
                                onClick={this._onClickMenuButton.bind(this)}
                                className={styles.menuButton}
                                title="Home">
                                Home
                            </Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link
                                href="/products"
                                onClick={this._onClickMenuButton.bind(this)}
                                className={styles.menuButton}
                                title="Products">
                                Products
                            </Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link
                                href="/cart"
                                className={styles.menuButton}
                                onClick={this._onClickMenuButton.bind(this)}
                                title="Checkout">
                                Checkout
                            </Link>
                        </li>
                        {showLogoutButton ? (
                            <li className={styles.menuItem}>
                                <LogoutButtonContainer
                                    onClick={this._onClickMenuButton.bind(this)}
                                    className={styles.menuButton}>
                                    Logout
                                </LogoutButtonContainer>
                            </li>
                        ) : null}
                        <li className={styles.menuItem}>
                            <Link
                                href="/admin"
                                className={styles.menuButton}
                                onClick={this._onClickMenuButton.bind(this)}
                                title="Admin Site">
                                Admin Site
                            </Link>
                        </li>
                    </menu>
                </div>
            </div>
        );
    }
}
