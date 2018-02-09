import React, {Component} from 'react';
import styles from '@/web-client/components/AdminRoot/style.css';
import AdminNavigation from '@/web-client/components/AdminNavigation';
import AdminHeader from '@/web-client/components/AdminHeader';

export default class AdminRoot extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            isNavVisible: true
        };
    }

    render ()
    {
        const {children, isAdmin} = this.props;
        return (
            <div>
                {!isAdmin ? (
                    <div>
                        You don't have the permission to access the admin app.
                    </div>
                ) : (
                    <div className={styles.container}>
                        <div className={styles.headerContainer}>
                            <AdminHeader onClickToggle={() => this.setState(s => ({isNavVisible: !s.isNavVisible}))}/>
                        </div>
                        <div className={styles.bodyContainer}>
                            <div className={styles.navContainer + ' ' + (this.state.isNavVisible ? '' : styles.hidden)}>
                                <AdminNavigation focusable={this.state.isNavVisible}/>
                            </div>
                            <div className={styles.mainContentContainer}>
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}